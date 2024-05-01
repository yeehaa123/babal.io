export const prerender = false;

// import { authenticate } from "@/db/peopleDB";

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
  // const people = await authenticate('Yeehaa')
  return new Response(
    JSON.stringify({ userName: "Yeeh" }), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  }
  );
}
