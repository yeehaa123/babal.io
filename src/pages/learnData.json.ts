export const prerender = false;
import { getLearnData } from '@/offcourse/db';
import { clerkClient } from '@clerk/clerk-sdk-node';

import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  const secretKey = import.meta.env.CLERK_SECRET_KEY;
  const publishableKey = import.meta.env.PUBLIC_CLERK_KEY;

  const { isSignedIn } = await clerkClient.authenticateRequest(
    request, { secretKey, publishableKey })
  console.log(isSignedIn);

  if (request.headers.get("Content-Type") === "application/json") {
    if (!isSignedIn) {
      return new Response(JSON.stringify({
        error: "unauthorized"
      }), {
        status: 404
      })
    }
    const body = await request.json();
    const { userName, courseIds } = body;
    const learnData = await getLearnData({ userName, courseIds })
    return new Response(JSON.stringify({
      learnData
    }), {
      status: 200
    })
  }
  return new Response(null, { status: 400 });
}
