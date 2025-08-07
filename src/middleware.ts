import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  console.log("Middleware - token:", token);
  console.log("Middleware - pathname:", request.nextUrl.pathname);

  if (!token && request.nextUrl.pathname.startsWith("/dashboard")) {
    console.log("Middleware - redirecting to login");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard"],
};
