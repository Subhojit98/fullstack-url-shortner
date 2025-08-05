import connectDb from "@/db/dbConfig";
import CustomLink from "@/models/link.model";
import User from "@/models/user.model";
import { NextResponse, NextRequest } from "next/server";
connectDb();

export async function DELETE(request: NextRequest) {
	try {
		const { id } = await request.json();

		if (!id) {
			return NextResponse.json(
				{ message: "ID is required" },
				{ status: 400 }
			);
		}

		const deletedLink = await CustomLink.findByIdAndDelete(id);

		if (!deletedLink) {
			return NextResponse.json(
				{ message: "Link not found" },
				{ status: 404 }
			);
		}

		const user = await User.findOneAndUpdate(
			{ createdLinks: id },
			{ $pull: { createdLinks: id } },
			{ new: true }
		);

		if (!user) {
			return NextResponse.json(
				{ message: "User with this Link id not found" },
				{ status: 404 }
			);
		}

		return NextResponse.json(
			{ message: "Link deleted successfully" },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error deleting link:", error);
		return NextResponse.json({ message: "Invalid request" }, { status: 400 });
	}
}
