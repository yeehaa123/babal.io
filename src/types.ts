export type NavItem = Record<"name" | "href", string>;

export type Step = {
  name: string;
  description: string;
}

export type CoursesDBResult = {
  id: string,
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

export type Curator = {
  alias: string;
  socials: {
    linkedin?: string
  }
}
export interface CheckpointsDBResult {
  courseId: string,
  task: string,
  href: string,
  description: string | null
}

export interface Checkpoint {
  courseId: string,
  task: string,
  href: string,
  description?: string | undefined,
  isCompleted?: boolean | undefined,
}


export type Course = {
  id: string,
  goal: string,
  description: string,
  curator: Curator,
  habitat?: string | undefined,
  checkpoints: Checkpoint[]
}
