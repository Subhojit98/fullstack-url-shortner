import User from "@/models/user.model";
import jwt from "jsonwebtoken";
const generateAccessTokenAndRefreshToken = async (userId: string) => {
	try {
		if (!userId) {
			throw new Error("User ID is required to generate tokens.");
		}

		const jwtTokenData = {
			userId,
		};

		const accessToken = jwt.sign(
			jwtTokenData,
			process.env.JWT_ACCESS_TOKEN_SECRET!,
			{
				expiresIn: "1d",
			}
		);

		const refreshToken = jwt.sign(
			jwtTokenData,
			process.env.JWT_REFRESH_TOKEN_SECRET!,
			{
				expiresIn: "7d",
			}
		);

		const user = await User.findByIdAndUpdate(
			userId,
			{
				$set: {
					refreshToken,
				},
			},
			{ new: true }
		);

		if (!user) {
			throw new Error("User not found or unable to update refresh token.");
		}

		return { accessToken, refreshToken };
	} catch (error: any) {
		throw new Error(error.message || error);
	}
};

export default generateAccessTokenAndRefreshToken;
