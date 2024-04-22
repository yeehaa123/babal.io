export type NavItem = Record<"name" | "href", string>;

export type Step = {
  name: string;
  description: string;
}

export type CoursesResult = {
  id: string,
  habitat: string | null,
  description: string,
  goal: string,
  curator: string
}

export type SocialsResult = {
  alias: string,
  linkedin: string,
}

export type CheckpointsResult = {
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
