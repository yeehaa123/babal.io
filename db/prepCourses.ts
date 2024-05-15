import { nanoid } from 'nanoid'
import type { Checkpoint, CheckpointsDBResult } from "@/types"
import OpenAI from "openai";
import { readCache, writeCache } from './helpers';

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

const openai = new OpenAI({ apiKey: import.meta.env.OPENAI_API_KEY });

async function getDescription({ href, task }: Checkpoint) {
  console.log("NOT CACHED ", href);
  const num_chars = 400;
  const completion = await openai.chat.completions.create({
    messages: [{ "role": "system", "content": "You are a helpful assistant." },
    {
      "role": "assistant", "content": `Please explain how the following link '${href}' helps people to achieve the following objective '${task}' in no more than ${num_chars} characters without including a suggestion to read the article or a link?`
    }],
    model: "gpt-4o"
  });

  const answer = completion.choices[0];
  return answer?.message.content || null;
}

async function getCachedDescription(href: string) {
  const cache = await readCache();
  if (!cache) return;
  const checkpoint = cache.get(href) as CheckpointsDBResult;
  return checkpoint.description || null;
}

async function prepCheckpoint(cp: Checkpoint) {
  const description = await getCachedDescription(cp.href) || await getDescription(cp);
  return { ...cp, description }
}


export async function prepCourses(courses: RawCourse[]): Promise<TempCourse[]> {
  return courses.map((course) => {
    const courseId = nanoid();
    const { habitat, ...rest } = course;
    return { courseId, habitat: habitat || null, ...rest }
  });
}

export async function prepCheckpoints(courses: TempCourse[]) {
  const flatCheckpoints = courses.flatMap(({ courseId, checkpoints }) => {
    return checkpoints.map((checkpoint) => {
      const checkpointId = nanoid();
      return { courseId, checkpointId, ...checkpoint }
    })
  })

  const promises = flatCheckpoints.map(prepCheckpoint);
  const data = await Promise.all(promises);
  const newCache = data.reduce((acc, cp) => {
    acc.set(cp.href, cp)
    return acc;
  }, new Map<string, CheckpointsDBResult>);
  writeCache(newCache);
  return data;
}
