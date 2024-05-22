export const prerender = false;
import {
  db,
  CompletionData,
} from 'astro:db';

import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request, locals }) => {

  if (request.headers.get("Content-Type") === "application/json") {
    const body = await request.json();
    const { userName, courseId, checkpointId, taskCompleted } = body;

    if (userName && userName === locals.auth.userName) {
      try {
        const completedAt = taskCompleted && new Date(taskCompleted);
        const learnRecordsDBResult = await db
          .insert(CompletionData)
          .values({ userName, courseId, checkpointId, completedAt })
          .onConflictDoUpdate({
            target: [CompletionData.checkpointId, CompletionData.userName],
            set: { completedAt: completedAt || null },
          });

        console.log(learnRecordsDBResult)
      } catch (e) {
        console.log(e)
      }
      return new Response(JSON.stringify({}), { status: 200 });
    }
  }
  return new Response(JSON.stringify({}), { status: 401 });
}
