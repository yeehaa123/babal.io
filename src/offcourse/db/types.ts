export type CoursesDBResult = {
  courseId: string,
  habitat: string | null,
  description: string,
  goal: string,
  curator: string
}

export type SocialsDBResult = {
  alias: string,
  linkedin: string | null
}

export type peopleDBResult = {
  alias: string,
}

export interface CheckpointsDBResult {
  courseId: string,
  checkpointId: string,
  task: string,
  href: string,
  description: string | null,
  tags: string | null
}
