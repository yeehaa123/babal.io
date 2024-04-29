import { authenticate } from "@/db/PeopleDB";
import type { APIRoute } from 'astro';


const people = (await authenticate('Yeehaa'))

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

export const Post: APIRoute = () => {
  return new Response(
    JSON.stringify(people), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  }
  );
}
