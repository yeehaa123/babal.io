import type { Checkpoint } from "@/types";

export function showCheckpoint(checkpoint: Checkpoint) {
  console.log(checkpoint);
};

export function editCourse() {
  console.log("EDIT");
}

export function addNotes() {
  console.log("NOTE");
}

export function cloneCourse() {
  console.log("CLONE");
}
