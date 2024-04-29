import { authenticate } from "@/db/PeopleDB";

const people = (await authenticate('Yeehaa'))

export async function POST() {
  return new Response(
    JSON.stringify(people), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  }
  );
}
