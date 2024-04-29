import type { Overlay } from "./index";
import OverlayChrome from "./OverlayChrome"

export default function SignInOverlay({ onConfirm, onCancel }: Overlay) {
  return (
    <OverlayChrome title="Sign in" onConfirm={onConfirm} onCancel={onCancel}>
    </OverlayChrome >
  )
}
