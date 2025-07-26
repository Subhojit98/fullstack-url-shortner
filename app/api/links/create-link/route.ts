import connectDb from "@/db/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { customAlphabet } from "nanoid";
import CustomLink from "@/models/link.model";
import isValidURL from "@/helper/checkValidUrl";
import User from "@/models/user.model";

connectDb();

const nanoid = customAlphabet(
	"1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
	10
);
export async function POST(request: NextRequest) {
	try {
		const { url, title, customUrlName, userId } = await request.json();

		if ([url, title, userId, customUrlName].some((field) => field === "")) {
			return NextResponse.json(
				{ message: "URL and title are required!", success: false },
				{ status: 400 }
			);
		}

		if (!isValidURL(url)) {
			return NextResponse.json(
				{ message: "URL is not valid!", success: false },
				{ status: 400 }
			);
		}

		const link = await CustomLink.create({
			shortId: `${customUrlName}-${nanoid()}`,
			title,
			originalUrl: url,
		});

		if (!link) {
			return NextResponse.json(
				{ message: "Failed to create link!" },
				{ status: 500 }
			);
		}

		await User.findByIdAndUpdate(userId, {
			$push: {
				createdLinks: link._id,
			},
		});

		return NextResponse.json(
			{ message: "custom URL is created.", success: true },
			{
				status: 201,
			}
		);
	} catch (error) {
		console.log(error);
		return NextResponse.json(
			{ message: "Error while creating the custom link!", success: false },
			{
				status: 500,
			}
		);
	}
}
