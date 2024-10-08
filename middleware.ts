// Without a defined matcher, this one line applies next-auth
// to the entire project
import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// export default withAuth({
//   pages: {
//     signIn: "/login", //Sign in page
//   },
// });

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(request: NextRequestWithAuth) {
    //TODO: Add Admin page and manajer teknis role
    //TODO: change manager teknis (using space is not best practice)
    if (
      request.nextUrl.pathname.startsWith("/admin") &&
      request.nextauth.token?.division.toLowerCase() !== "admin" &&
      request.nextauth.token?.role.toLowerCase() !== "admin" &&
      request.nextauth.token?.role.toLowerCase() !== "manager teknis"
    ) {
      return NextResponse.rewrite(new URL("/denied", request.url));
    }
    if (
      request.nextUrl.pathname.startsWith("/marketing") &&
      request.nextauth.token?.division.toLowerCase() !== "marketing" &&
      request.nextauth.token?.role.toLowerCase() !== "admin"
    ) {
      return NextResponse.rewrite(new URL("/denied", request.url));
    }
    if (
      request.nextUrl.pathname.startsWith("/sampling") &&
      request.nextauth.token?.division.toLowerCase() !== "sampling" &&
      request.nextauth.token?.role.toLowerCase() !== "admin"
    ) {
      return NextResponse.rewrite(new URL("/denied", request.url));
    }
    if (
      request.nextUrl.pathname.startsWith("/pplhp") &&
      request.nextauth.token?.division.toLowerCase() !== "pplhp" &&
      request.nextauth.token?.role.toLowerCase() !== "admin"
    ) {
      return NextResponse.rewrite(new URL("/denied", request.url));
    }
    if (
      request.nextUrl.pathname.startsWith("/lab") &&
      request.nextauth.token?.division.toLowerCase() !== "lab" &&
      request.nextauth.token?.role.toLowerCase() !== "admin"
    ) {
      return NextResponse.rewrite(new URL("/denied", request.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/login", //Sign in page
    },
  }
);

// Applies next-auth only to matching routes - can be regex
// Ref: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: [
    "/sampling/:path*",
    "/marketing/:path*",
    "/pplhp/:path*",
    "/lab/:path*",
    "/admin/:path*",
  ],
};
