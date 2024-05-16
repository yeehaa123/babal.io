import { nanoid } from 'nanoid'
import { readCache, writeCache } from "./helpers"
import type { Checkpoint, CheckpointsDBResult, Course } from "@/types"
import type { LLMCache } from './helpers';
import { getLLMDescription } from './LLMaugmentation';
import crypto from 'crypto';

export interface RawCourse {
  goal: string,
  description: string,
  curator: string,
  habitat?: string | undefined,
  checkpoints: {
    task: string,
    href: string,
  }[]
}

export interface TempCourse extends Omit<RawCourse, "habitat"> {
  courseId: string,
  habitat: string | null,
}

export interface TempCheckpoint extends Omit<Checkpoint, "description" | "tags"> {
  goal: Course['goal']
}

async function prepCheckpoint(cp: TempCheckpoint, cache: LLMCache) {
  const { href, task, goal } = cp;
  const id = href + task + goal;
  let hash = crypto.createHash('md5').update(id).digest("hex")
  const { description, summary, tags } = cache.get(hash) || await getLLMDescription(cp);
  cache.set(hash, { ...cp, description, summary, tags });
  return { ...cp, description, tags };
}

export function prepCourses(courses: RawCourse[]): TempCourse[] {
  return courses.map((course) => {
    const courseId = nanoid();
    const { habitat, ...rest } = course;
    return { courseId, habitat: habitat || null, ...rest }
  });
}

export async function prepCheckpoints(courses: TempCourse[]) {
  const cache = await readCache() || new Map;
  const flatCheckpoints = courses.flatMap(({ courseId, goal, checkpoints }) => {
    return checkpoints.map((checkpoint) => {
      const checkpointId = nanoid();
      return { courseId, goal, checkpointId, ...checkpoint }
    })
  })
  const promises = flatCheckpoints.map((cp) => prepCheckpoint(cp, cache));
  const checkpoints = await Promise.all(promises);
  await writeCache(cache);
  return checkpoints;
}

export function prepTags({ checkpoints }: { checkpoints: CheckpointsDBResult[] }) {
  const courseTags = checkpoints.reduce((acc, { courseId, tags: tagsString }) => {
    const newTags = tagsString?.split(",").map(s => s.trim()) || [];
    const oldTags = acc.get(courseId) || new Set(newTags);
    const tags = new Set([...oldTags, ...newTags])
    acc.set(courseId, [...tags])
    return acc;
  }, new Map<string, string[]>)
  return Array.from(courseTags).flatMap(([courseId, tags]) => {
    return tags.map(tag => {
      return { courseId, tag }
    })
  })
}
