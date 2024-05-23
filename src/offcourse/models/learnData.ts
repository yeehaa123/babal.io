import type { Checkpoint, LearnRecord } from "../types";

export const initialLearnRecord: LearnRecord = {
  isBookmarked: false,
  tasksCompleted: {},
  notes: []
}

export function toggleTask({ tasksCompleted, ...learnRecord }:
  LearnRecord = initialLearnRecord, checkpointId: Checkpoint['checkpointId']) {
  return {
    ...learnRecord,
    tasksCompleted: {
      ...tasksCompleted,
      [checkpointId]: tasksCompleted[checkpointId] ? undefined : new Date
    }
  }
}
