import type { Overlay } from "./";
import OverlayChrome from "./OverlayChrome"


export default function EditOverlay({ onConfirm, onCancel }: Overlay) {
  return (
    <OverlayChrome title="Edit" onConfirm={onConfirm} onCancel={onCancel}>
    </OverlayChrome >
  )
}
