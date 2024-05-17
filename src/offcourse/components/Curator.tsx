import type { Curator } from "@/types";

import {
  GitHubLogoIcon,
  LinkedInLogoIcon,
  InstagramLogoIcon
} from '@radix-ui/react-icons'
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { CardDescription } from "@/components/ui/card"
import { AvatarImage } from "./";

export default function Curator({ alias, socials }: Curator) {
  return (
    <div className="flex align-middle py-4 items-center justify-between">
      <a href={`/offcourse/curator/${alias}`} className="flex items-center space-x-3">
        <Avatar>
          <AvatarImage userName={alias} saturation={100} lightness={100} />
          <AvatarFallback className="bg-indigo-600 text-white">YH</AvatarFallback>
        </Avatar>
        <CardDescription>{alias}</CardDescription>
      </a>

      {socials &&
        <div className="flex items-center space-x-3">
          <GitHubLogoIcon className="h-6 w-6" />
          <LinkedInLogoIcon className="h-6 w-6" />
          <InstagramLogoIcon className="h-6 w-6" />
        </div>}
    </div>
  )
}
