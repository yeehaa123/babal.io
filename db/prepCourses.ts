import { nanoid } from 'nanoid'
import type { Checkpoint } from "@/types"

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

interface TempCourse extends Omit<RawCourse, "habitat"> {
  courseId: string,
  habitat: string | null,
}

async function getDescription(cp: Checkpoint) {
  const description = "The 80,000 Hours article details a method to identify personal strengths for career advancement. It encourages developing new skills beyond existing strengths. The method involves analyzing personal experiences, reflective questioning, and consulting established strength lists. Emphasis is placed on the importance of feedback and self-reflection for effectively identifying and using personal strengths."
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
  const promises = flatCheckpoints.map(getDescription);
  return Promise.all(promises);
}
