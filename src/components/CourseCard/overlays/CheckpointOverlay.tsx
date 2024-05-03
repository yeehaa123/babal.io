import {
  CardDescription,
} from "@/components/ui/card"

import type { Props } from "./index"
import OverlayChrome from "./OverlayChrome";

export default function CheckpointOverlay({ checkpoint, actions }: Props) {
  const { task, description, isCompleted } = checkpoint!;
  const onCancel = actions.hideCheckpoint;
  console.log(isCompleted);
  return (
    <OverlayChrome title={task} onCancel={onCancel}>
      <CardDescription>
        {description}
      </CardDescription>
    </OverlayChrome>
  )
}
