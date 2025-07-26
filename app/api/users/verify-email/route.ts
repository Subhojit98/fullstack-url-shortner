import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/db/dbConfig";
import User from "@/models/user.model";

connectDb();

export async function POST(request: NextRequest) {
	try {
		const requestBody = await request.json();
		const { token } = requestBody;
		if (!token) {
			return NextResponse.json(
				{ message: "Token is required to validate the user!!" },
				{
					status: 404,
				}
			);
		}

		const user = await User.findOne({
			verifyToken: token,
			verifyTokenExpiry: {
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

		user.isVerified = true;
		user.verifyToken = undefined;
		user.verifyTokenExpiry = undefined;

		await user.save();

		return NextResponse.json(
			{ message: "Email is verified successfully", success: true },
			{
				status: 201,
			}
		);
	} catch (error: unknown) {
		console.log(error instanceof Error ? error.message : error);
		return NextResponse.json(
			{
				message: `verification error:${error instanceof Error ? error.message : "Unknown error"}`,
				success: false,
			},
			{
				status: 500,
			}
		);
	}
}
