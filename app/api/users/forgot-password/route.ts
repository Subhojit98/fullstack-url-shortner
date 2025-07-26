import connectDb from "@/db/dbConfig";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

connectDb();

export async function POST(request: NextRequest) {
	try {
		const requestBody = await request.json();

		const { token, newPassword } = requestBody;

		if (!token) {
			return NextResponse.json(
				{ message: "Token is required to validate the user!!" },
				{
					status: 404,
				}
			);
		}
		const user = await User.findOne({
			forgotPasswordToken: token,
			forgotPasswordTokenExpiry: {
				$gt: Date.now(),
			},
		});

		if (!user) {
			return NextResponse.json(
				{ message: "Invalid token or token is expired!", success: false },
				{
					status: 400,
				}
			);
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(newPassword, salt);

		user.password = hashedPassword;
		user.forgotPasswordToken = undefined;
		user.forgotPasswordTokenExpiry = undefined;

		await user.save();

		return NextResponse.json(
			{
				message: "password changed successfully.",
				success: true,
				redirect: true,
			},
			{
				status: 201,
			}
		);
	} catch (error: unknown) {
		console.log(error instanceof Error ? error.message : error);
		return NextResponse.json(
			{ message: "error while changing password", success: false },
			{
				status: 500,
			}
		);
	}
}
