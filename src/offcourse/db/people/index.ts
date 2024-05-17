import type {
  Curator,
} from "@/offcourse/types";

import { getAllPeople, getPersonByAlias } from "./queries";

export function getPeople() {
  return getAllPeople();
}

type GetPersonParams = {
  alias: Curator['alias']
}
export async function getPerson({ alias }: GetPersonParams): Promise<Curator | undefined> {
  return getPersonByAlias(alias)
}
