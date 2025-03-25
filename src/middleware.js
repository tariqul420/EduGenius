import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/student(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn, sessionClaims } = await auth();

  if (!userId && isProtectedRoute(req)) {
    // Add custom logic to run before redirecting

    return redirectToSignIn();
  }

  // Add custom logic to run after signing in

  // Get the user's role from sessionClaims
  const userRole = sessionClaims?.role;

  // Redirect students to the /student route
  if (userRole === "student" && req.nextUrl.pathname !== "/student") {
    return NextResponse.redirect(new URL("/student", req.nextUrl.origin));
  }

  // Restrict access to /admin for non-admin users
  if (userRole !== "admin" && req.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/", req.nextUrl.origin)); // Redirect to a safe page
  }

  // Allow access if no restrictions apply
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
