import {
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import type { ReactNode } from "react"

type Props = {
  title: string,
  formId?: string,
  onCancel: () => void,
  onConfirm: (v: any) => void,
  children?: ReactNode,

}
export default function OverlayChrome({ onCancel, onConfirm, formId, children, title }: Props) {
  return <>
    <CardHeader>
      <CardTitle className="flex">
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4 grow flex flex-col justify-center">
      {children}
    </CardContent >
    <CardFooter className="flex w-full justify-between gap-x-2">
      {formId
        ? <Button type="submit" form={formId} className="w-full">Submit</Button>
        : <Button onClick={onConfirm} form={formId} className="w-full">Submit</Button>}
      <Button onClick={onCancel} className="w-full">Cancel</Button>
    </CardFooter>
  </>
}
