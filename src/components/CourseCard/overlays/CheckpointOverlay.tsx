import type { Overlay } from "./index";
import OverlayChrome from "./OverlayChrome"
import {
  CardDescription,
} from "@/components/ui/card"

export default function SignInOverlay({ onCancel }: Overlay) {
  return (
    <OverlayChrome title="Discover your personal strengths" onCancel={onCancel}>
      <CardDescription>
        The 80,000 Hours article details a method to identify personal strengths for career advancement. It encourages developing new skills beyond existing strengths. The method involves analyzing personal experiences, reflective questioning, and consulting established strength lists. Emphasis is placed on the importance of feedback and self-reflection for effectively identifying and using personal strengths.
      </CardDescription>
    </OverlayChrome >
  )
}
