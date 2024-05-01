import OverlayChrome from "./OverlayChrome"
import type { Overlay } from "./";
import {
  CardDescription,
} from "@/components/ui/card"


const description = "The 80,000 Hours article details a method to identify personal strengths for career advancement. It encourages developing new skills beyond existing strengths. The method involves analyzing personal experiences, reflective questioning, and consulting established strength lists. Emphasis is placed on the importance of feedback and self-reflection for effectively identifying and using personal strengths."

export default function SignInOverlay({ onCancel, title }: Overlay) {
  return (
    <OverlayChrome title={title} onCancel={onCancel}>
      <CardDescription>
        {description}
      </CardDescription>
    </OverlayChrome >
  )
}
