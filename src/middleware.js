import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/student(.*)",
  "/instructor/(.*)",
  "/admin(.*)",
]);

const publicRoutes = [
  "/",
  "/blogs(.*)",
  "/courses(.*)",
  "/instructors(.*)",
  "/sign-in(.*)",
  "/sign-up(.*)",
];

export default clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn, sessionClaims } = await auth();
  const { pathname } = req.nextUrl;

  // Skip all API routes
  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // Handle protected routes
  if (!userId && isProtectedRoute(req)) {
    return redirectToSignIn({ returnBackUrl: req.url });
  }

  const userRole = sessionClaims?.role;

  // Role-based routing
  if (pathname.startsWith("/student")) {
    if (userRole !== "student") {
      return NextResponse.redirect(new URL(`${userRole}`, req.url));
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin")) {
    if (userRole !== "admin") {
      return NextResponse.redirect(new URL(`${userRole}`, req.url));
    }
    return NextResponse.next();
  }

  if (pathname === "instructor") {
    if (userRole !== "instructor") {
      return NextResponse.redirect(new URL(`${userRole}`, req.url));
    }
    return NextResponse.next();
  }

  // Skip middleware for public routes
  if (publicRoutes.some((route) => pathname.match(new RegExp(`^${route}$`)))) {
    return NextResponse.next();
  }

  // Default allow for other authenticated users
  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next|[^?]*\\.(?:[^/]+$)).*)", "/(api|trpc)(.*)"],
};
