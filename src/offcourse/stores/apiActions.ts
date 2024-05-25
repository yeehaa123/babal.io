import type {
  Course,
  Checkpoint
} from "@/offcourse/types";

export async function addNote({ courseId, message }:
  {
    courseId: Course['courseId'],
    message: string,
  }) {
  return await fetch(`/offcourse/notes/${courseId}.json`, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message })
  });
}

export async function updateBookmarkStatus({ courseId, isBookmarked }:
  {
    courseId: Course['courseId'],
    isBookmarked: boolean
  }) {
  return await fetch(`/offcourse/bookmarks/${courseId}.json`, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ isBookmarked })
  });
}

export async function updateTaskStatus({ courseId, checkpointId, taskCompleted }:
  {
    courseId: Course['courseId'],
    checkpointId: Checkpoint['checkpointId'],
    taskCompleted: boolean
  }) {
  return await fetch(`/offcourse/tasks/${courseId}/${checkpointId}.json`, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ taskCompleted })
  });
}

export async function fetchLearnData({ courseIds }:
  { courseIds: Course['courseId'][], userName: string }) {
  if (courseIds.length > 0) {
    const response = await fetch('/offcourse/learnRecords.json', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ courseIds })
    });
    const data = await response.json();
    return data.learnRecords;
  }
}

