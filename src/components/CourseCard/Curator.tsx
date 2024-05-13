import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

import {
  CardDescription,
} from "@/components/ui/card"

import { minidenticon } from 'minidenticons'
import { useMemo } from 'react'

type Socials = {
  linkedin?: string,
}

interface Props {
  alias: string;
  socials: Socials | undefined;
}

import { GitHubLogoIcon, LinkedInLogoIcon, InstagramLogoIcon } from '@radix-ui/react-icons'
import { cn } from "@/lib/utils"

const GeneratedAvatarImage = ({ userName, className }: { userName: string, className: string }) => {
  const saturation = 100;
  const lightness = 100;
  const svgURI = useMemo(
    () => 'data:image/svg+xml;utf8,' + encodeURIComponent(minidenticon(userName, saturation, lightness)),
    [userName, saturation, lightness]
  )
  return <AvatarImage
    src={svgURI}
    className={cn("rounded bg-black text-white", className)}
    alt={userName} />
}


export default function Curator({ alias, socials }: Props) {
  return (
    <div className="flex align-middle py-4 items-center justify-between">
      <div className="flex items-center space-x-3">
        <Avatar>
          <GeneratedAvatarImage className="hover:invisible" userName={alias} />
          <AvatarFallback className="bg-black text-white">YH</AvatarFallback>
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
