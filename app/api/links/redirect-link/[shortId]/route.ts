import { getUserLocationInfo } from "@/data/allQueryRequest";
import connectDb from "@/db/dbConfig";
import CustomLink from "@/models/link.model";
import { NextRequest, NextResponse } from "next/server";
import { UAParser } from "ua-parser-js";

connectDb();

export async function GET(
	request: NextRequest,
	context: { params: Promise<{ shortId: string }> }
) {
	try {
		const { shortId } = await context.params;
		if (!shortId) {
			return NextResponse.json(
				{ message: "Custom url is required!" },
				{ status: 400 }
			);
		}

		const link = await CustomLink.findOne({
			shortId,
		});

		if (!link) {
			return NextResponse.json(
				{ message: "Link is not found!" },
				{ status: 404 }
			);
		}

		const userIp =
			process.env.NODE_ENV === "development"
				? "152.58.180.6"
				: request.headers.get("x-forwarded-for")?.split(",")?.[0]?.trim() ||
					request.headers.get("x-real-ip") ||
					"";

		let userLocationInfo;

		if (userIp) {
			try {
				userLocationInfo = await getUserLocationInfo(userIp);
			} catch (error) {
				console.error("Failed to fetch IP location:", error);
				return NextResponse.json(
					{ message: "Failed to fetch IP location", success: false },
					{ status: 500 }
				);
			}
		}

		const ua = request.headers.get("user-agent") || "";
		const parser = new UAParser(ua);
		const deviceType = parser.getDevice().type || "desktop";

		//? setting the clicks and date info

		link.totalClicks += 1;
		link.lastVisited = new Date();

		const existingDevice = link.devices.find(
			(d: { name: string; count: number }) => d.name === deviceType
		);
		if (existingDevice) {
			existingDevice.count += 1;
		} else {
			link.devices.push({ name: deviceType, count: 1 });
		}

		// ? setting the device info
		if (userLocationInfo) {
			const city = userLocationInfo.city || "Unknown City";
			const country = userLocationInfo.country || "Unknown Country";
			const regionKey = `${city}, ${country}`;

			const existingRegion = link.locations.find(
				(loc: { name: string; count: number }) => loc.name === regionKey
			);

			if (existingRegion) {
				existingRegion.count += 1;
			} else {
				link.locations.push({ name: regionKey, count: 1 });
			}
		}

		await link.save();

		return NextResponse.redirect(link.originalUrl, 302);
	} catch (error: unknown) {
		console.log(error instanceof Error ? error.message : error);
		return NextResponse.json(
			{ message: "Error while redirecting to custom link!", success: false },
			{
				status: 500,
			}
		);
	}
}
