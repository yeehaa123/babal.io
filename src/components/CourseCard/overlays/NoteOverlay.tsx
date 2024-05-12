import { Button } from "@/components/ui/button"
import {
  CardHeader,
  CardFooter,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import type { CourseCardStore } from "..";

import CardChrome from "../CardChrome";
import { NoteForm } from "../forms/NoteForm";
import { useState } from "react";

import type { CourseNote } from "../forms/NoteForm";

export function NoteOverlay({ course, cardState, actions }: CourseCardStore) {
  const { id } = course;
  const { overlayMode } = cardState;
  const { hideCheckpoint } = actions;
  const formId = `${id}-note-form`
  const [notes, setNotes] = useState<CourseNote[]>([]);

  return (
    <CardChrome>
      <CardHeader className="flex flex-row gap-x-7 space-y-0 items-top">
        <CardTitle>{overlayMode}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col grow justify-between">
        <div>{notes.map((note, index) => (
          <div key={index}>
            {note.message}
          </div>)
        )}</div>
        <NoteForm formId={formId} onConfirm={(note) => setNotes(notes => ([note, ...notes]))} />
      </CardContent>
      <CardFooter className="flex flex-col w-full justify-between gap-2">
        <Button type="submit" form={formId} className="w-full">Add Note</Button>
        <Button onClick={() => hideCheckpoint(id)} className="w-full">Close</Button>
      </CardFooter>
    </CardChrome >

  )
}
