import { db, Socials, People, eq } from 'astro:db';
import type {
  Curator,
  peopleDBResult,
  SocialsDBResult,
} from "@/types";

export async function authenticate(userName: string) {
  const curator = await getPeopleByAlias(userName);
  return { userName: curator?.alias };
}

export async function getPeople() {
  const dbResult = await db.select()
    .from(People)
    .innerJoin(Socials, eq(People.alias, Socials.alias))

  const result = processPeopleResults(dbResult);
  return Array.from(result, ([_, c]) => c)
}

export async function getPeopleByAlias(alias: string): Promise<Curator | undefined> {
  const dbResult = await db.select()
    .from(People)
    .where(eq(People.alias, alias))
    .innerJoin(Socials, eq(People.alias, Socials.alias))

  const result = processPeopleResults(dbResult);
  return result.get(alias);
}


function processPeopleResults(result: {
  People: peopleDBResult,
  Socials: SocialsDBResult
}[]) {
  return result.reduce<Map<string, Curator>>(
    (acc, row) => {
      const { alias } = row.People;
      const { alias: _a, ...rest } = row.Socials;
      const socials = Object.fromEntries(Object.entries(rest).map(([k, v]) => ([k, v ? v : undefined])));
      acc.set(alias, {
        alias,
        socials
      })
      return acc;
    },
    new Map()
  );
}

