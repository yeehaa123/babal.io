export const prerender = false;

import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request, locals }) => {

  const body = await request.json();
  if (request.headers.get("Content-Type") === "application/json") {
    console.log(body, locals);
  }
  return new Response(JSON.stringify({ hello: "world" }), { status: 200 });
}
