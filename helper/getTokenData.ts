import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
export const getTokenData = async (request: NextRequest) => {
	try {
		const token = request.cookies.get("accessToken")?.value;
		if (!token) return null;

		const decodedToken: any = jwt.verify(
			token,
			process.env.JWT_ACCESS_TOKEN_SECRET!
		);

		return decodedToken.userId;
	} catch {
		return null;
	}
};
