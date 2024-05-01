import type { Overlay } from "./";
import OverlayChrome from "./OverlayChrome"

export default function CloneOverlay({ onConfirm, onCancel }: Overlay) {
  return (
    <OverlayChrome title="Clone" onConfirm={onConfirm} onCancel={onCancel}>
    </OverlayChrome >)
}
