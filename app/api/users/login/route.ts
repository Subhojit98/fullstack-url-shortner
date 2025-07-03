import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/db/dbConfig";
import User from "@/models/user.model";
import { isValidEmailAddress } from "@/helper/emailValidator";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
connectDb();

export async function POST(request: NextRequest) {
	try {
		const requestBody = await request.json();
		const { email, password } = requestBody;

		if (!email || !password) {
			return NextResponse.json(
				{ message: "email and password is required!", success: false },
				{
					status: 400,
				}
			);
		}

		if (!isValidEmailAddress(email)) {
			return NextResponse.json(
				{ message: "Email type is not valid!", success: false },
				{
					status: 406,
				}
			);
		}

		const user = await User.findOne({ email });

		if (!user) {
			return NextResponse.json(
				{
					message: "User not found! with this email address!",
					success: false,
				},
				{
					status: 404,
				}
			);
		}
		const isPasswordMatch = bcrypt.compareSync(password, user.password);

		if (!isPasswordMatch) {
			return NextResponse.json(
				{ message: "Invalid password!", success: false },
				{
					status: 401,
				}
			);
		}

		const jwtTokenData = {
			userId: user._id,
		};

		const jwtToken = jwt.sign(jwtTokenData, process.env.JWT_SECRET!, {
			expiresIn: "1d",
		});

		const response = NextResponse.json(
			{ message: "user logged in successfully!", success: true },
			{
				status: 200,
			}
		);

		response.cookies.set("accessToken", jwtToken, {
			httpOnly: true,
			// expires: ""
		});

		return response;
	} catch (error) {
		console.log("Error in login API:", error);
		return NextResponse.json(
			{ message: "Internal Server Error while login" },
			{
				status: 500,
			}
		);
	}
}
