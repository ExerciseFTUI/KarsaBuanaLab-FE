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
    // console.log(request.nextUrl.pathname);
    // console.log(request.nextauth.token);
    // if (
    //   request.nextUrl.pathname.startsWith("/marketing") &&
    //   request.nextauth.token?.division.toLowerCase() !== "marketing"
    // ) {
    //   return NextResponse.rewrite(new URL("/denied", request.url));
    // }
    // if (
    //   request.nextUrl.pathname.startsWith("/sampling") &&
    //   request.nextauth.token?.division.toLowerCase() !== "sampling"
    //   //&& request.nextauth.token?.role !== "manager"
    // ) {
    //   return NextResponse.rewrite(new URL("/denied", request.url));
    // }
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
export const config = { matcher: ["/sampling/:path*", "/marketing/:path*"] };
