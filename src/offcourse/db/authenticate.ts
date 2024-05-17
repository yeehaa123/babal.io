import { getPerson } from "./people";

export async function authenticate(userName: string) {
  const curator = await getPerson({ alias: userName });
  return { userName: curator?.alias };
}
