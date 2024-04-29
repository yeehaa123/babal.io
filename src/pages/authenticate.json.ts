export const prerender = false;

import { authenticate } from "@/db/PeopleDB";
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

export const Post: APIRoute = async () => {
  const people = await authenticate('Yeehaa')
  return new Response(
    JSON.stringify(people), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  }
  );
}
