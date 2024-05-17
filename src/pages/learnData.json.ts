export const prerender = false;
import { getLearnData } from '@/offcourse/db';
import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  if (request.headers.get("Content-Type") === "application/json") {
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
