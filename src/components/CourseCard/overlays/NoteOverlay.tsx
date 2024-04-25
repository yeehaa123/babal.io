import {
  CardTitle,
} from "@/components/ui/card"

import type { Overlay } from "./index";

export default function NoteOverlay({ }: Overlay) {
  return <>
    <CardTitle className="flex w-full space-x-5 ">
      EDIT
    </CardTitle>
  </>
}
