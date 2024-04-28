import type { Overlay } from "./index";
import OverlayChrome from "./OverlayChrome"

export default function SignInOverlay({ onCancel }: Overlay) {
  return (
    <OverlayChrome title="Sign in" onCancel={onCancel}>
    </OverlayChrome >
  )
}
