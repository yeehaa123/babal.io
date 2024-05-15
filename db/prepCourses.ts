import { nanoid } from 'nanoid'
import type { Checkpoint, Course } from "@/types"
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

export interface TempCheckpoint extends Checkpoint {
  goal: Course['goal']
}

async function prepCheckpoint(cp: TempCheckpoint, cache: LLMCache) {
  const { href, task, goal } = cp;
  const id = href + task + goal;
  let hash = crypto.createHash('md5').update(id).digest("hex")
  const { description, summary } = cache.get(hash) || await getLLMDescription(cp);
  cache.set(hash, { ...cp, description, summary });
  return { ...cp, description };
}


export async function prepCourses(courses: RawCourse[]): Promise<TempCourse[]> {
  return courses.map((course) => {
    const courseId = nanoid();
    const { habitat, ...rest } = course;
    return { courseId, habitat: habitat || null, ...rest }
  });
}

export async function prepCheckpoints(courses: TempCourse[], cache: LLMCache) {
  const flatCheckpoints = courses.flatMap(({ courseId, goal, checkpoints }) => {
    return checkpoints.map((checkpoint) => {
      const checkpointId = nanoid();
      return { courseId, goal, checkpointId, ...checkpoint }
    })
  })

  const promises = flatCheckpoints.map((cp) => prepCheckpoint(cp, cache));
  return Promise.all(promises);
}
