import { type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // const userCookie = request.cookies.get("user");
  // if (request.nextUrl.pathname === "/" && !userCookie) {
  //   return NextResponse.redirect(new URL("/new", request.url));
  // }
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
