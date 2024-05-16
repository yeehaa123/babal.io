import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar"


import {
  CardDescription,
} from "@/components/ui/card"

import {
  GitHubLogoIcon,
  LinkedInLogoIcon,
  InstagramLogoIcon
} from '@radix-ui/react-icons'

import { GeneratedAvatarImage } from "./GeneratedAvatar";

type Socials = {
  linkedin?: string,
}

interface Props {
  alias: string;
  socials: Socials | undefined;
}

export default function Curator({ alias, socials }: Props) {
  return (
    <div className="flex align-middle py-4 items-center justify-between">
      <div className="flex items-center space-x-3">
        <Avatar>
          <GeneratedAvatarImage userName={alias} saturation={100} lightness={100} />
          <AvatarFallback className="bg-indigo-600 text-white">YH</AvatarFallback>
        </Avatar>
        <CardDescription>{alias}</CardDescription>
      </div>

      {socials &&
        <div className="flex items-center space-x-3">
          <GitHubLogoIcon className="h-6 w-6" />
          <LinkedInLogoIcon className="h-6 w-6" />
          <InstagramLogoIcon className="h-6 w-6" />
        </div>}
    </div>
  )
}
