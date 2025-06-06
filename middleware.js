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
  "/sign-up(.*)",
];

export default clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn, sessionClaims } = await auth();
  const { pathname } = req.nextUrl;

  // Skip all API routes
  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // Skip middleware for public routes first (move this check up)
  if (publicRoutes.some((route) => pathname.match(new RegExp(`^${route}$`)))) {
    return NextResponse.next();
  }

  // Handle protected routes for unauthenticated users
  if (!userId && isProtectedRoute(req)) {
    return redirectToSignIn({ returnBackUrl: req.url });
  }

  const userRole = sessionClaims?.role;

  // Role-based routing for protected routes
  if (pathname.startsWith("/student")) {
    if (userRole !== "student") {
      return NextResponse.redirect(new URL(`/${userRole}`, req.url));
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin")) {
    if (userRole !== "admin") {
      return NextResponse.redirect(new URL(`/${userRole}`, req.url));
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/instructor")) {
    // Singular, protected route
    if (userRole !== "instructor") {
      return NextResponse.redirect(new URL(`/${userRole}`, req.url));
    }
    return NextResponse.next();
  }

  // Default allow for other authenticated users
  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next|[^?]*\\.(?:[^/]+$)).*)", "/(api|trpc)(.*)"],
};
