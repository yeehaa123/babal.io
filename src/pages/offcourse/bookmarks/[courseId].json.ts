export const prerender = false;
import {
  db,
  BookmarkData,
} from 'astro:db';

import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ params, request, locals }) => {
  if (request.headers.get("Content-Type") === "application/json") {
    const { courseId } = params;
    const { userName } = locals.auth;
    const { isBookmarked } = await request.json();
    if (courseId && userName) {
      try {
        const bookmarkedAt = isBookmarked ? new Date : null;
        await db
          .insert(BookmarkData)
          .values({ userName, courseId, bookmarkedAt })
          .onConflictDoUpdate({
            target: [BookmarkData.courseId, BookmarkData.userName],
            set: { bookmarkedAt },
          });
        return new Response(JSON.stringify({ courseId, isBookmarked }), { status: 200 });
      } catch (e) {
        return new Response(JSON.stringify({}), { status: 401 });
      }
    }
  }
  return new Response(null, { status: 400 });
}
