export const prerender = false;

import { getLearnRecordByUserNameAndCourseId } from '@/offcourse/db/learnRecords/queries';
import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request, locals }) => {

  if (request.headers.get("Content-Type") === "application/json") {
    const body = await request.json();
    const { userName, courseId, checkpointId } = body;

    if (userName && userName === locals.auth.userName) {
      const learnRecord = await getLearnRecordByUserNameAndCourseId({ userName, courseId });
      console.log(learnRecord);
      return new Response(JSON.stringify({ userName, courseId, checkpointId }), { status: 200 });
    }
  }
  return new Response(JSON.stringify({}), { status: 401 });
}
