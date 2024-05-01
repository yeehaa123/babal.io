import type { Overlay } from "./";
import OverlayChrome from "./OverlayChrome"


export default function SignInOverlay({ onConfirm, onCancel }: Overlay) {
  return (
    <OverlayChrome title="Sign in" onConfirm={onConfirm} onCancel={onCancel}>
    </OverlayChrome >
  )
}
