import connectDb from "@/db/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import { getTokenData } from "@/helper/getTokenData";
connectDb();

export async function POST(request: NextRequest) {
	try {
		const response = NextResponse.json(
			{
				message: "user logged out successfully!",
				success: true,
			},
			{
				status: 200,
			}
		);

		const userId = await getTokenData(request);

		if (!userId) {
			return NextResponse.json(
				{ message: "User ID not found from token", success: false },
				{ status: 400 }
			);
		}

		await User.findByIdAndUpdate(userId, {
			$set: {
				refreshToken: undefined,
			},
		});

		response.cookies.set("accessToken", "", {
			httpOnly: true,
			expires: new Date(0),
		});

		response.cookies.set("refreshToken", "", {
			httpOnly: true,
			expires: new Date(0),
		});

		return response;
	} catch (error: unknown) {
		console.log(error instanceof Error ? error.message : error);
		return NextResponse.json(
			{ message: "Error While logging out", success: false },
			{
				status: 500,
			}
		);
	}
}
