import type {
  Curator,
} from "@/offcourse/types";

import type {
  peopleDBResult,
  SocialsDBResult,
} from "../types";

import { db, Socials, People, eq } from 'astro:db';

export async function getAllPeople() {
  const dbResult = await db.select()
    .from(People)
    .innerJoin(Socials, eq(People.alias, Socials.alias))

  const result = processPeopleResults(dbResult);
  return Array.from(result, ([_, c]) => c)
}

export async function getPersonByAlias(alias: string): Promise<Curator | undefined> {
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
      const socials = Object.fromEntries(
        Object.entries(rest).map(([k, v]) => ([k, v ? v : undefined]))
      );
      acc.set(alias, {
        alias,
        socials
      })
      return acc;
    },
    new Map()
  );
}
