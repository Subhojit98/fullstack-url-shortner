import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getTokenData = (request: NextRequest) => {
	try {
		const token = request.cookies.get("accessToken")?.value || "";
		if (!token) {
			throw new Error("token not found!");
		}
		const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET!);

		return decodedToken.userId;
	} catch (error: any) {
		throw new Error(error.message || error);
	}
};
