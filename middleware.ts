import { NextRequest, NextResponse } from "next/server";
import isPublicPath from "./helper/isPublicpath";

export function middleware(request: NextRequest) {
	const path = request.nextUrl.pathname;
	const isPublic = isPublicPath(path);

	const accessToken = request.cookies.get("accessToken")?.value;
	const refreshToken = request.cookies.get("refreshToken")?.value;

	if (isPublic && accessToken) {
		return NextResponse.redirect(new URL("/dashboard", request.url));
	}

	if (!isPublic && !accessToken && !refreshToken) {
		return NextResponse.redirect(new URL("/login", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/login", "/signup", "/dashboard"],
};
