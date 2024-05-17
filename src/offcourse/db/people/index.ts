import type { Curator } from "@/offcourse/types";

import { getAllPeople, getPersonByAlias } from "./queries";

export function getPeople() {
  return getAllPeople();
}

type PersonQueryParams = {
  alias: Curator['alias']
}

export async function getPerson({ alias }: PersonQueryParams): Promise<Curator | undefined> {
  return getPersonByAlias(alias)
}
