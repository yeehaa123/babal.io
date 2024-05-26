import type { LLMCache } from './helpers';
import type { Checkpoint, Course } from "@/offcourse/types"
import { createOpenAI } from '@ai-sdk/openai';
import { writeFile } from 'fs/promises'
import { createHash } from 'crypto';
import { readCache, writeCache } from "./helpers"
import { getLLMDescription } from './LLMaugmentation';
import type { TempCourse } from './prepCourses';
import { generateObject } from 'ai';
import { z } from 'zod';

const openai = createOpenAI({ apiKey: import.meta.env.OPENAI_API_KEY });


export interface TempCheckpoint extends Omit<Checkpoint, "description" | "tags"> {
  goal: Course['goal']
}

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

export async function augmentCourse(course: TempCourse) {
  const num_words = 300;
  const num_chars = 400;
  const min_num_tags = 1;
  const max_num_tags = 4;
  const tag_length = 7;
  console.log(course);

  const { object } = await generateObject({
    model: openai('gpt-4o'),
    schema: z.object({
      course: z.object({
        courseId: z.string().nanoid(),
        goal: z.string(),
        summary: z.string(),
        habitat: z.nullable(z.string()),
        description: z.string(),
        curator: z.string().toLowerCase(),
        checkpoints: z.array(
          z.object({
            task: z.string(),
            tags: z.array(z.string()),
            href: z.string(),
            summary: z.string(),
            description: z.string()
          }),
        ),
      }),
    }),
    prompt: `Given the following course: ${JSON.stringify(course)}. Augment the model with the missing data.  

Start with augmenting the checkpoints. After carefully analyzing the resources referenced in the links in the checkpoints hrefs, explain how the mentioned links helps people to achieve the associated goal and required task in a checkpoint specific summary of no more than ${num_words} words without including a suggestion to read the article or a link? Be specific and show that you really understand the article or video referenced. It is important that you don't halucinate. Also, just give the summary no reference to the question needed.

The checkpoint's description should contain a shortened version of the summary in a maximum of ${num_chars} characters?

Each checkpoint should get ${min_num_tags} to ${max_num_tags} tags. A single tags is a single-word, simple, non-hyphenated and are associated to a href? Only include tags that are really important. Again, only give me the answer. No extra words. Tags can have no more than ${tag_length} characters, are not composed of multiple words and can thus not contain a hyphen, and are all lowercase.

 The toplevel summary should explain how the checkpoints help the learner achieve the toplevel goal: ${course.goal}. The toplevel summary should have a maximum of ${num_words}. 

The goal's description should contain a shortened version of the summary in a maximum of ${num_chars} characters?

If a habitat is null. Keep it null.
`
  });
  return object
}

export async function augmentCourses(courses: TempCourse[]) {
  for await (const course of courses) {
    const augmentedCourse = await augmentCourse(course);
    await writeFile(`./tempCourses/${course.goal}.json`, JSON.stringify(augmentedCourse, null, 2))
  }
}
