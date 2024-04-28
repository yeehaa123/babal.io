export type NavItem = Record<"name" | "href", string>;

export type Step = {
  name: string;
  description: string;
}

export type CoursesResult = {
  habitat: string | null,
  description: string,
  goal: string,
  curator: string
}

export type SocialsResult = {
  alias: string,
  linkedin: string | null
}

export type CheckpointsResult = {
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
