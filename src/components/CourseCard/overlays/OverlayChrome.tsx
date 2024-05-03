import type { ReactNode } from "react";
import { Button } from "@/components/ui/button"
import CardChrome from "../CardChrome";
import {
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card"

type Props = {
  title: string,
  onCancel: () => void,
  onConfirm?: (() => void) | undefined,
  formId?: string | undefined,
  canConfirm?: boolean
  children: ReactNode
}

export default function Overlay({
  title,
  onCancel,
  onConfirm,
  formId,
  canConfirm,
  children
}: Props) {
  return (
    <CardChrome>
      <CardHeader>
        <CardTitle className="flex">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 grow flex flex-col justify-center">
        {children}
      </CardContent >
      <CardFooter className="flex w-full justify-between gap-x-2">
        {formId && <Button type="submit" form={formId} className="w-full">Submit</Button>}
        {canConfirm && <Button onClick={onConfirm} className="w-full">Submit</Button>}
        <Button onClick={onCancel} className="w-full">Cancel</Button>
      </CardFooter>
    </CardChrome>
  )
}
