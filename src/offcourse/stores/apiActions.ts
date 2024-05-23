import type {
  Course,
  Checkpoint
} from "@/offcourse/types";

export async function updateLearnData({ courseId, checkpointId, userName, taskCompleted }:
  {
    courseId: Course['courseId'],
    userName: string,
    checkpointId: Checkpoint['checkpointId'],
    taskCompleted: Date | undefined
  }) {
  return await fetch(`/learnRecords/${courseId}.json`, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ courseId, checkpointId, userName, taskCompleted })
  });
}

export async function fetchLearnData({ courseIds, userName }:
  { courseIds: Course['courseId'][], userName: string }) {
  if (courseIds.length > 0) {
    const response = await fetch('/learnRecords.json', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ courseIds, userName })
    });
    const data = await response.json();
    return data.learnRecords;
  }
}

