export type NavItem = Record<"name" | "href", string>;

export type Step = {
  name: string;
  description: string;
}

export type CoursesDBResult = {
  habitat: string | null,
  description: string,
  goal: string,
  curator: string
}

export type SocialsDBResult = {
  alias: string,
  linkedin: string | null
}

export type CheckpointsDBResult = {
  goal: string,
  task: string,
  href: string
}

export type Curator = {
  alias: string;
  socials: {
    linkedin?: string
  }
}

export type Course = {
  goal: string,
  description: string,
  curator: Curator,
  habitat?: string | undefined,
  checkpoints: {
    task: string,
    href: string
  }[]
}

export type RawCourse = {
  goal: string,
  description: string,
  curator: string,
  habitat?: string | undefined,
  checkpoints: {
    task: string,
    href: string
  }[]
}
