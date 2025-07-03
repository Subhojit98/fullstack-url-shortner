import connectDb from "@/db/dbConfig";
import { getTokenData } from "@/helper/getTokenData";
import User from "@/models/user.model";
import { NextResponse, NextRequest } from "next/server";

connectDb();

export async function GET(request: NextRequest) {
	try {
		const userId = await getTokenData(request);

		const user = await User.findById(userId).select(
			"-password -forgotPasswordToken -forgotPasswordTokenExpiry -verifyToken -verifyTokenExpiry"
		);

		if (!user) {
			return NextResponse.json(
				{ message: "Invalid token, user not found!", success: false },
				{
					status: 401,
				}
			);
		}

		return NextResponse.json(
			{
				message: "user found successfully",
				data: user,
				success: true,
			},
			{
				status: 200,
			}
		);
	} catch (error: any) {
		console.log("error while fetching user info:", error.message || error);
		return NextResponse.json(
			{
				message: "unauthorized user access!",
				success: false,
			},
			{
				status: 401,
			}
		);
	}
}
