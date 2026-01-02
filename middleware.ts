import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  // Everything is protected by default except public routes
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Recommended matcher: run on all routes except Next internals/static files
    "/((?!_next|.*\\..*).*)",
    "/(api|trpc)(.*)",
  ],
};
