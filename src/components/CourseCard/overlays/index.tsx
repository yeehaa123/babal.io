import {
  CardDescription,
} from "@/components/ui/card"
import OverlayChrome from "./OverlayChrome"

export type Overlay = {
  title: string,
  onCancel: () => void,
  onConfirm: (v: any) => void | Promise<void>
}

export default function Overlay({ title, onCancel, onConfirm }: Overlay) {
  console.log(title);
  return (<OverlayChrome title={title} onConfirm={onConfirm} onCancel={onCancel}>
    <CardDescription>
      {JSON.stringify({}, null, 2)}
    </CardDescription>
  </OverlayChrome >)
}

