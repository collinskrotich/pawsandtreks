import { NextRequest, NextResponse } from "next/server";

export const ADMIN_COOKIE_NAME = "paws_admin_auth";
const ADMIN_PASSWORD = "555999";

export function isValidAdminPassword(password: string) {
  return password === ADMIN_PASSWORD;
}

export function isAdminRequest(request: NextRequest) {
  return request.cookies.get(ADMIN_COOKIE_NAME)?.value === "1";
}

export function unauthorizedJsonResponse() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
