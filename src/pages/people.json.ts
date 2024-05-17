import { getPeople } from "@/offcourse/db";

const people = await getPeople();

export async function GET() {
  return new Response(
    JSON.stringify(people), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  }
  );
}
