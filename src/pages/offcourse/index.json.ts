import { getCollection } from 'astro:content';

const courses = (await getCollection('courses'))

export async function GET() {
  return new Response(
    JSON.stringify(courses), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  }
  );
}
