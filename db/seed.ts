import type { Curator } from "@/offcourse/types"
import type { RawCourse } from "./prepCourses"

import {
  db,
  People,
  Socials,
  Courses,
  Tags,
  Checkpoints,
  CompletionData,
  BookmarkData,
  NoteData
} from 'astro:db';

import { readDir } from "./helpers"
import { prepCourses, prepCheckpoints, prepTags } from "./prepCourses"
import { augmentCheckpoints } from "./augmentCheckpoints"
import { prepBookmarkData, prepCompletionData, prepNotesData } from "./prepLearnData"

function prepPeople(rawPeople: Curator[]) {
  return rawPeople.map(p => ({ alias: p.alias.toLowerCase() }));
}

function prepSocials(rawPeople: Curator[]) {
  return rawPeople.map(p => ({ alias: p.alias.toLowerCase(), ...p.socials }));
}

export default async function() {
  const rawCourses = await readDir<RawCourse>('./src/content/courses');
  const rawPeople = await readDir<Curator>('./src/content/people');

  const people = prepPeople(rawPeople);
  const socials = prepSocials(rawPeople);
  const courses = prepCourses(rawCourses);
  const tempCheckpoints = prepCheckpoints(courses);

  const checkpoints = await augmentCheckpoints(tempCheckpoints)
  const tags = prepTags(checkpoints)

  const completionData = prepCompletionData({ people, checkpoints });
  const bookmarkData = prepBookmarkData({ people, courses });
  const noteData = prepNotesData({ people, courses });

  await db.insert(People).values(people);
  await db.insert(Socials).values(socials);
  await db.insert(Courses).values(courses);
  await db.insert(Checkpoints).values(checkpoints);
  await db.insert(CompletionData).values(completionData);
  await db.insert(BookmarkData).values(bookmarkData);
  await db.insert(NoteData).values(noteData);
  await db.insert(Tags).values(tags);
}
