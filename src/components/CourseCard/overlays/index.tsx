import {
  CardDescription,
} from "@/components/ui/card"
import OverlayChrome from "./OverlayChrome"
import type { Checkpoint } from "../types"

export type Overlay = {
  title: string,
  checkpoint: Checkpoint | undefined,
  onCancel: () => void,
  onConfirm: (v: any) => void | Promise<void>
}

export default function Overlay({ title, onCancel, onConfirm, checkpoint }: Overlay) {
  return (<OverlayChrome title={title} onConfirm={onConfirm} onCancel={onCancel}>
    <CardDescription>
      {JSON.stringify(checkpoint, null, 2)}
    </CardDescription>
  </OverlayChrome >)
}

