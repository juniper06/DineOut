import { NextRequest, NextResponse } from "next/server";
import { getUserCookie, removeUserCookie } from "@/lib/cookies";

export const config = {
	matcher: "/profile",
};

export async function middleware(request: NextRequest) {
  const user = await getUserCookie();
  if(!user.isAuthenticated){
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}