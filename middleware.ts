import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const publicPaths = ["/login", "/register", "/forgot-password"];
  const isPublic = publicPaths.some((path) => req.nextUrl.pathname.startsWith(path));
  if (isPublic) return NextResponse.next();

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!login|register|forgot-password|api|_next/static|_next/image|favicon.ico).*)",
  ],
};
