import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const currentUser = false;
  // if (currentUser && request.url.includes("/login")) {
  //   return NextResponse.redirect(new URL("/", request.url));
  // }
  // if (!currentUser && !request.url.includes("/login")) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
