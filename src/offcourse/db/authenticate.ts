import type { Curator } from "../types";
import { getPerson } from "./people";

type AuthenticateParams = {
  userName: Curator['alias']
}

export async function authenticate({ userName }: AuthenticateParams) {
  const curator = await getPerson({ alias: userName });
  return { userName: curator?.alias };
}
