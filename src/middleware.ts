import { NextRequest, NextResponse } from "next/server";
import { getUserCookie, removeUserCookie } from "@/lib/cookies";

export const config = {
	matcher: ["/profile/(.*)", "/profile", "/dashboard"],
};

export async function middleware(request: NextRequest) {
	const user = await getUserCookie();
	if (!user.isAuthenticated) {
		return NextResponse.redirect(new URL("/login", request.nextUrl));
	}
	if (
		request.nextUrl.pathname.startsWith("/dashboard") &&
		user.userDetails?.role !== "ADMIN"
	) {
		return NextResponse.redirect(new URL("/", request.nextUrl));
	}
}
