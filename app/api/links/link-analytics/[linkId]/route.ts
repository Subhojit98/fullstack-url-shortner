import connectDb from "@/db/dbConfig";
import CustomLink from "@/models/link.model";
import { NextRequest, NextResponse } from "next/server";

connectDb();

export async function GET(
	_: NextRequest,
	{ params }: { params: Promise<{ linkId: string }> }
) {
	try {
		const { linkId } = await params;

		if (!linkId) {
			return NextResponse.json(
				{ message: "Link id is not found!" },
				{
					status: 404,
				}
			);
		}

		const link = await CustomLink.findById(linkId);

		if (!link) {
			return NextResponse.json(
				{
					message:
						"invalid link id.. Link details not found are not found!",
				},
				{
					status: 404,
				}
			);
		}

		return NextResponse.json(
			{
				message: "Link details found successfully.",
				data: link,
				success: true,
			},
			{
				status: 200,
			}
		);
	} catch (error) {
		console.log(error);
		return NextResponse.json(
			{ message: "error while getting the link info!", success: false },
			{
				status: 500,
			}
		);
	}
}
