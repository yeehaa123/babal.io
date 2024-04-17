import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

import {
  CardDescription,
} from "@/components/ui/card"

interface Props {
  curator: string;
}

export default function AvatarStack({ curator }: Props) {
  return (
    <div className="flex align-middle p-3 my-3 flex items-center space-x-2">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>YH</AvatarFallback>
      </Avatar>
      <CardDescription>{curator}</CardDescription>
    </div>
  )
}
