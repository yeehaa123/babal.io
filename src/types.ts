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



