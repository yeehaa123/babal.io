import { getPeopleByAlias } from "@/db/PeopleDB";

const people = (await getPeopleByAlias('Yeehaa'))

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
