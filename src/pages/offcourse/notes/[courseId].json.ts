export const prerender = false;
import {
  db,
  NoteData,
} from 'astro:db';

import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ params, request, locals }) => {
  if (request.headers.get("Content-Type") === "application/json") {
    const { courseId } = params;
    const { userName } = locals.auth;
    const { message } = await request.json();
    if (courseId && userName && message) {
      const createdAt = new Date;
      try {
        await db
          .insert(NoteData)
          .values({ userName, courseId, message, createdAt })
        return new Response(JSON.stringify({ courseId, message }), { status: 200 });
      } catch (e) {
        return new Response(JSON.stringify({}), { status: 401 });
      }
    }
  }
  return new Response(null, { status: 400 });
}
