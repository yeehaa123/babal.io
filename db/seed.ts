import { db, People, Socials, Courses, Checkpoints, CompletionData, BookmarkData, NoteData } from 'astro:db';
import { readDir } from "./helpers"
import type { Curator } from "@/types"
import type { RawCourse } from "./prepCourses"
import { prepCourses, prepCheckpoints } from "./prepCourses"
import { prepBookmarkData, prepCompletionData, prepNotesData } from "./prepLearnData"



function prepPeople(rawPeople: Curator[]) {
  return rawPeople.map(p => ({ alias: p.alias }));
}

function prepSocials(rawPeople: Curator[]) {
  return rawPeople.map(p => ({ alias: p.alias, ...p.socials }));
}



export default async function() {
  const rawCourses = await readDir<RawCourse>('./src/content/courses');
  const rawPeople = await readDir<Curator>('./src/content/people');
  const people = prepPeople(rawPeople);
  const socials = prepSocials(rawPeople);
  const courses = await prepCourses(rawCourses);
  const checkpoints = await prepCheckpoints(courses);
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
}
