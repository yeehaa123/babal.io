import {
  CardDescription,
} from "@/components/ui/card"
import { determineOverlayState } from "./helpers";

import type { Props } from "./index"
import OverlayChrome from "./OverlayChrome";


export default function CheckpointOverlay(props: Props) {
  const overlayState = determineOverlayState(props);
  return <OverlayChrome {...overlayState}>
    <CardDescription>
      {JSON.stringify(props.checkpoint, null, 2)}
    </CardDescription>
  </OverlayChrome>
}
