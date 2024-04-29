import { getPeople } from "@/db/peopleDB";

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
