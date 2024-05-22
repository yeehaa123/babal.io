import { defineMiddleware } from "astro:middleware";
import { createClerkClient } from '@clerk/clerk-sdk-node';

export const onRequest = defineMiddleware(async (context, next) => {
  const secretKey = import.meta.env.CLERK_SECRET_KEY;
  const publishableKey = import.meta.env.PUBLIC_CLERK_KEY;
  const authRoutes = ['/learnData'];
  const isAuthenticatedRoute = authRoutes.find(route => context.url.pathname.startsWith(route))
  if (isAuthenticatedRoute) {
    console.log(context.url.pathname);
    const clerkClient = createClerkClient({ secretKey, publishableKey })
    const { isSignedIn, toAuth } = await clerkClient.authenticateRequest(context.request)

    const authData = toAuth();
    if (authData && authData.userId) {
      const { username } = await clerkClient.users.getUser(authData.userId)
      context.locals.auth = { isSignedIn, userName: username }
    }
  }
  next();
});
