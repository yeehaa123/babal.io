import type { Curator, Checkpoint, Course } from "@/offcourse/types"

export type Step = {
  name: string;
  description: string;
}

export type NavItem = Record<"name" | "href", string>;


export type { Curator, Checkpoint, Course }
