import connectDb from "@/db/dbConfig";
import { NextResponse } from "next/server";

connectDb();

export async function POST() {
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

		response.cookies.set("accessToken", "", {
			httpOnly: true,
			expires: Date.now(),
		});

		return response;
	} catch (error: any) {
		console.log(error.message || error);
		return NextResponse.json(
			{ message: "Error While logging out", success: false },
			{
				status: 500,
			}
		);
	}
}
