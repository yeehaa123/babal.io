import type { Overlay } from "./";
import { useState } from "react";
import OverlayChrome from "./OverlayChrome"
import NoteForm from "../forms/NoteForm";

const notess = ["OMG this is awesome", "I need more of this", "Please Don't Stop"];

export default function NoteOverlay({ onCancel, onConfirm }: Overlay) {
  const [notes, _setNotes] = useState(notess);
  const formId = "note"

  // const onConfirm = ({ note }: any) => {
  //   setNotes(n => [note, ...n]);
  // }

  return (
    <OverlayChrome title="Add Note" formId={formId} onCancel={onCancel}>
      <div className="grow max-h-[200px]">
        {notes.map((note, index) => (
          <p key={index}>{note}</p>
        ))}
      </div>
      <NoteForm onConfirm={onConfirm} />
    </OverlayChrome>
  )
}
