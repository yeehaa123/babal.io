export const prerender = false;

import { authenticate } from "@/offcourse/db";

import type { APIRoute } from 'astro';

export const GET: APIRoute = () => {
  return new Response(
    JSON.stringify({}), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  }
  );
}

export const POST: APIRoute = async () => {
  const userName = "yeehaa"
  const people = await authenticate({ userName })

  return new Response(
    JSON.stringify(people), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  }
  );
}
