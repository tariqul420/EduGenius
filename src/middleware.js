import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/student(.*)",
  "/instructor(.*)",
  "/admin(.*)",
]);

const publicRoutes = [
  "/",
  "/blogs(.*)",
  "/courses(.*)",
  "/instructors(.*)",
  "/sign-in(.*)",
  "/sign-up(.*)"
];

export default clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn, sessionClaims } = await auth();
  const { pathname } = req.nextUrl;

  // Skip middleware for public routes
  if (publicRoutes.some(route => pathname.match(new RegExp(`^${route}$`)))) {
    return NextResponse.next();
  }

  // Handle protected routes
  if (!userId && isProtectedRoute(req)) {
    return redirectToSignIn({ returnBackUrl: req.url });
  }

  const userRole = sessionClaims?.role;

  // Role-based routing
  if (userRole === "student") {
    if (!pathname.startsWith("/student")) {
      return NextResponse.redirect(new URL("/student", req.url));
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin")) {
    if (userRole !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/instructor")) {
    if (userRole !== "instructor") {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  }

  // Default allow for other authenticated users
  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:[^/]+$)).*)",
    "/(api|trpc)(.*)",
  ],
};