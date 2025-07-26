import connectDb from "@/db/dbConfig";
import cloudinary from "@/helper/claudinaryUpload";
import { isValidEmailAddress } from "@/helper/emailValidator";
import { unlink } from "fs/promises";
import { writeFile } from "fs/promises";
import { NextResponse, NextRequest } from "next/server";
import path from "path";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import generateAccessTokenAndRefreshToken from "@/helper/generateTokens";
import sendEmail from "@/helper/mailer";

// ? connect with database

connectDb();

export async function POST(req: NextRequest) {
	try {
		const fromData = await req.formData();
		const username = fromData.get("username") as string;
		const email = fromData.get("email") as string;
		const password = fromData.get("password") as string;
		const avatar = fromData.get("avatar") as File;

		if ([username, email, password].some((field) => field === "")) {
			return NextResponse.json(
				{ message: "All fields must be filled!!" },
				{
					status: 400,
				}
			);
		}

		if (!isValidEmailAddress(email)) {
			return NextResponse.json(
				{ message: "Email type is not acceptable!!" },
				{
					status: 400,
				}
			);
		}

		// ? avatar url uploader
		let cloudinaryUrl = null;

		if (avatar) {
			const bytes = await avatar.arrayBuffer();
			const buffer = Buffer.from(bytes);

			//? Generate unique filename
			const timestamp = Date.now();
			const fileExt = avatar.name.split(".").pop();
			const fileName = `avatar-${timestamp}.${fileExt}`;

			const filePath = path.join(process.cwd(), "public/static", fileName);
			await writeFile(filePath, buffer);

			const cloudinaryRes = await cloudinary.uploader.upload(filePath, {
				folder: "url-shortener",
			});

			if (!cloudinaryRes) {
				throw new Error("cloudinary upload error!!", cloudinaryRes);
			}
			await unlink(filePath);
			cloudinaryUrl = cloudinaryRes.secure_url;
		}

		const existedUser = await User.findOne({ email });

		if (existedUser) {
			return NextResponse.json(
				{ message: "user with this email is already exists!!" },
				{
					status: 409,
				}
			);
		}

		// ? hash Password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		// ? New User
		const createdUser = await User.create({
			username,
			email,
			password: hashedPassword,
			avatar: cloudinaryUrl,
		});

		const newUser = await User.findById(createdUser._id).select(
			"-password -verifyToken -verifyTokenExpiry -refreshToken -forgotPasswordToken -forgotPasswordTokenExpiry"
		);

		if (!newUser) {
			return NextResponse.json(
				{ message: "Error while creating new User!!" },
				{
					status: 500,
				}
			);
		}

		// ? send verification link
		await sendEmail({
			email,
			emailType: "VERIFY_EMAIL",
			userId: newUser._id,
		});

		const { accessToken, refreshToken } =
			await generateAccessTokenAndRefreshToken(newUser._id);
		if (!accessToken || !refreshToken) {
			return NextResponse.json(
				{ message: "Error while creating JWT token!!" },
				{
					status: 500,
				}
			);
		}

		const response = NextResponse.json(
			{
				message: "user Registered successfully.",
				success: true,
				data: newUser,
			},
			{
				status: 201,
			}
		);

		response.cookies.set("accessToken", accessToken, {
			httpOnly: true,
			expires: new Date(Date.now() + 60 * 60 * 24 * 1000), // 1 day
			path: "/",
		});
		response.cookies.set("refreshToken", refreshToken, {
			httpOnly: true,
			expires: new Date(Date.now() + 60 * 60 * 24 * 7 * 1000), // 7 days
			path: "/",
		});

		return response;
	} catch (error: unknown) {
		console.log(error instanceof Error ? error.message : error);
		return NextResponse.json(
			{ message: error instanceof Error ? error.message : "Unknown error" },
			{
				status: 500,
			}
		);
	}
}
