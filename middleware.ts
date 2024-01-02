// Without a defined matcher, this one line applies next-auth
// to the entire project
import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login", //Sign in page
  },
});

// Applies next-auth only to matching routes - can be regex
// Ref: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = { matcher: ["/sampling/:path*", "/marketing/:path*"] };
