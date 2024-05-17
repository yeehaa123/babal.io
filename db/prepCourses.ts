import { nanoid } from 'nanoid'
import type { CheckpointsDBResult } from "@/offcourse/db/types"

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



export function prepCourses(courses: RawCourse[]): TempCourse[] {
  return courses.map((course) => {
    const courseId = nanoid();
    const { habitat, curator, ...rest } = course;
    return { courseId, curator: curator.toLowerCase(), habitat: habitat || null, ...rest }
  });
}

export function prepCheckpoints(courses: TempCourse[]) {
  const flatCheckpoints = courses.flatMap(({ courseId, goal, checkpoints }) => {
    return checkpoints.map((checkpoint) => {
      const checkpointId = nanoid();
      return { courseId, goal, checkpointId, ...checkpoint }
    })
  })
  return flatCheckpoints;
}

export function prepTags(checkpoints: CheckpointsDBResult[]) {
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
