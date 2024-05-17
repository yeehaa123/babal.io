export type NavItem = Record<"name" | "href", string>;

export type Step = {
  name: string;
  description: string;
}

export type Curator = {
  alias: string;
  socials: {
    linkedin?: string
  }
}

export interface Checkpoint {
  courseId: string,
  checkpointId: string,
  task: string,
  href: string,
  description: string | undefined,
  tags: string[]
}


export type Course = {
  courseId: string,
  goal: string,
  description: string,
  curator: Curator,
  habitat?: string | undefined,
  checkpoints: Checkpoint[],
  tags: string[]
}
