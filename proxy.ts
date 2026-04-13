import { NextRequest, NextResponse } from "next/server";
import { auth } from "./lib/auth/auth";

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers, 
  });

  const { pathname } = request.nextUrl;

  const isAuthPage =
    pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up");

  const isDashboardRoute =
    pathname.startsWith("/today") ||
    pathname.startsWith("/upcoming") ||
    pathname.startsWith("/search");

  // Logged in → block auth pages
  if (isAuthPage && session?.user) {
    return NextResponse.redirect(new URL("/today", request.url));
  }

  // Not logged in → block dashboard
  if (isDashboardRoute && !session?.user) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}