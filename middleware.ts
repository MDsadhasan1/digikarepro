import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // Protect /admin routes — only ADMIN or MANAGER role
  if (pathname.startsWith("/admin")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login?callbackUrl=/admin", req.url));
    }
    if (token.role !== "ADMIN" && token.role !== "MANAGER") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // Protect account routes
  if (pathname.startsWith("/account") || pathname.startsWith("/orders")) {
    if (!token) {
      return NextResponse.redirect(new URL(`/login?callbackUrl=${pathname}`, req.url));
    }
  }

  // Redirect already-authenticated users away from auth pages
  if ((pathname === "/login" || pathname === "/register") && token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/account/:path*",
    "/orders/:path*",
    "/login",
    "/register",
  ],
};
