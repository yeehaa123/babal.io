import {
  CardDescription,
} from "@/components/ui/card"
import type { Checkpoint } from "../types"


type Props = {
  checkpoint: Checkpoint
}

export default function CheckpointOverlay({ checkpoint }: Props) {
  return (<CardDescription>
    {JSON.stringify(checkpoint, null, 2)}
  </CardDescription>)
}
