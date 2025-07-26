import connectDb from "@/db/dbConfig";
import generateAccessTokenAndRefreshToken from "@/helper/generateTokens";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
connectDb();

export async function POST(request: NextRequest) {
	try {
		const oldRefreshToken = request.cookies.get("refreshToken")?.value;

		if (!oldRefreshToken) {
			return NextResponse.json(
				{
					message: "refreshToken is invalid or expired",
					success: false,
					redirect: true,
				},
				{
					status: 401,
				}
			);
		}

		let payload;
		try {
			payload = jwt.verify(
				oldRefreshToken,
				process.env.JWT_REFRESH_TOKEN_SECRET!
			) as { userId: string };
		} catch {
			return NextResponse.json(
				{ message: "Invalid refresh token", success: false },
				{ status: 401 }
			);
		}

		const user = await User.findById(payload.userId);
		if (!user) {
			return NextResponse.json(
				{
					message: "User not found with this refresh token",
					success: false,
					redirect: true,
				},
				{
					status: 401,
				}
			);
		}

		const { accessToken, refreshToken } =
			await generateAccessTokenAndRefreshToken(user._id);

		user.refreshToken = refreshToken;
		await user.save();

		const response = NextResponse.json(
			{
				message: "Tokens generated successfully",
				success: true,
			},
			{
				status: 201,
			}
		);

		response.cookies.set("accessToken", accessToken, {
			httpOnly: true,
			expires: new Date(Date.now() + 60 * 60 * 72 * 1000), // 3 days
			sameSite: "lax",
			// secure: process.env.NODE_ENV === "production",
			path: "/",
		});

		response.cookies.set("refreshToken", refreshToken, {
			httpOnly: true,
			expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
			sameSite: "lax",
			// secure: process.env.NODE_ENV === "production",
			path: "/",
		});

		return response;
	} catch (error: unknown) {
		console.log(error instanceof Error ? error.message : error);
		return NextResponse.json(
			{ message: "Error", success: false },
			{
				status: 500,
			}
		);
	}
}
