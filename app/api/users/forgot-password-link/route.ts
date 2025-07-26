import connectDb from "@/db/dbConfig";
import { isValidEmailAddress } from "@/helper/emailValidator";
import sendEmail from "@/helper/mailer";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

connectDb();

export async function POST(request: NextRequest) {
	try {
		const { email } = await request.json();

		if (!email || !isValidEmailAddress(email)) {
			return NextResponse.json(
				{ message: "valid email is required !", success: false },
				{
					status: 406,
				}
			);
		}

		const user = await User.findOne({ email });

		if (!user) {
			return NextResponse.json(
				{
					message: "No user found with this email address!",
					success: false,
				},
				{
					status: 404,
				}
			);
		}

		await sendEmail({ email, emailType: "RESET_PASSWORD", userId: user._id });

		return NextResponse.json(
			{
				message: "reset-password link is sent successfully.",
				success: true,
			},
			{
				status: 201,
			}
		);
	} catch (error: unknown) {
		console.log(error instanceof Error ? error.message : error);
		return NextResponse.json(
			{
				message: "Error while sending reset-password link!",
				success: true,
			},
			{
				status: 500,
			}
		);
	}
}
