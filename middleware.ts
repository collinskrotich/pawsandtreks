import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME } from "@/lib/admin-auth";

export function middleware(request: NextRequest) {
	const isAdminPath = request.nextUrl.pathname.startsWith("/admin");
	const isLoginPath = request.nextUrl.pathname.startsWith("/admin/login");

	if (isAdminPath && !isLoginPath) {
		const authCookie = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
		if (authCookie !== "1") {
			const loginUrl = new URL("/admin/login", request.url);
			return NextResponse.redirect(loginUrl);
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/admin/:path*"],
};
