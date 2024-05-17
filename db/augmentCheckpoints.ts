import type { LLMCache } from './helpers';
import type { Checkpoint, Course } from "@/offcourse/types"

export interface TempCheckpoint extends Omit<Checkpoint, "description" | "tags"> {
  goal: Course['goal']
}

import { createHash } from 'crypto';
import { readCache, writeCache } from "./helpers"
import { getLLMDescription } from './LLMaugmentation';

async function augmentCheckpoint(cp: TempCheckpoint, cache: LLMCache) {
  const { href, task, goal } = cp;
  const id = href + task + goal;
  let hash = createHash('md5').update(id).digest("hex")
  const { description, summary, tags } = cache.get(hash) || await getLLMDescription(cp);
  cache.set(hash, { ...cp, description, summary, tags });
  return { ...cp, description, tags };
}

export async function augmentCheckpoints(checkpoints: TempCheckpoint[]) {
  const cache = await readCache() || new Map;
  const promises = checkpoints.map((cp) => augmentCheckpoint(cp, cache));
  const cp = await Promise.all(promises);
  await writeCache(cache);
  return cp;
}
