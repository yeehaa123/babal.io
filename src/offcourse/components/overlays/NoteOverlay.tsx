import type { CourseCardStore } from "@/offcourse/stores/types";
import { Button } from "@/components/ui/button"
import {
  CardHeader,
  CardFooter,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import { NoteForm } from "../forms/NoteForm";

export default function NoteOverlay(
  { learnRecord, cardState, actions }: CourseCardStore
) {
  if (!learnRecord) {
    return <div>ERROR</div>
  }
  const { courseId, notes } = learnRecord;
  const { overlayMode } = cardState;
  const { hideOverlay, addNote } = actions;
  const formId = `${courseId}-note-form`
  return (
    <>
      <CardHeader className="flex flex-row gap-x-7 space-y-0 items-top">
        <CardTitle>{overlayMode}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col grow justify-between">
        <div>{notes.map((note, index) => (
          <div key={index}>
            {note.message}
          </div>)
        )}</div>
        <NoteForm courseId={courseId} formId={formId} onConfirm={(note) => addNote(note)} />
      </CardContent>
      <CardFooter className="flex flex-col w-full justify-between gap-2">
        <Button type="submit" form={formId} className="w-full">Add Note</Button>
        <Button onClick={() => hideOverlay({ courseId })} className="w-full">Close</Button>
      </CardFooter>
    </>
  )
}
