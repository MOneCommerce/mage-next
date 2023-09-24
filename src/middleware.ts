import { NextRequest, NextResponse } from "next/server";



export async function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;

  const response = NextResponse.next();
  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|manifest.json|robots.txt/).*)",
  ],
};
