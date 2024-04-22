import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

import {
  CardDescription,
} from "@/components/ui/card"

type Socials = {
  linkedin?: string,
}

interface Props {
  alias: string;
  socials: Socials | undefined;
}

import { GitHubLogoIcon, LinkedInLogoIcon, InstagramLogoIcon } from '@radix-ui/react-icons'


export default function Curator({ alias, socials }: Props) {
  return (
    <div className="flex align-middle py-4 items-center justify-between">
      <div className="flex items-center space-x-3">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>YH</AvatarFallback>
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
