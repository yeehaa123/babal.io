export const prerender = false;
import {
  db,
  CompletionData,
} from 'astro:db';

import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ params, request, locals }) => {
  if (request.headers.get("Content-Type") === "application/json") {
    const { courseId, checkpointId } = params;
    const { userName } = locals.auth;
    const { taskCompleted } = await request.json();
    if (courseId && checkpointId && userName) {
      try {
        const completedAt = taskCompleted && new Date || null
        await db
          .insert(CompletionData)
          .values({ userName, courseId, checkpointId, completedAt })
          .onConflictDoUpdate({
            target: [CompletionData.checkpointId, CompletionData.userName],
            set: { completedAt },
          });
        return new Response(
          JSON.stringify({ courseId, checkpointId, taskCompleted }), { status: 200 });
      } catch (e) {
        return new Response(JSON.stringify({}), { status: 401 });
      }
    }
  }
  return new Response(null, { status: 400 });
}
