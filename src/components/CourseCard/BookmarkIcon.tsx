import { cn } from "@/lib/utils"
import { BookmarkIcon, BookmarkFilledIcon } from '@radix-ui/react-icons'
type Props = {
  isBookmarked: boolean,
  canBookmark: boolean,
  onClick: () => void
}

export default function Bookmark({
  isBookmarked,
  onClick,
  canBookmark,
}: Props) {
  const Icon = isBookmarked
    ? BookmarkFilledIcon
    : BookmarkIcon
  return <Icon onClick={onClick} className={
    cn("h-8 w-8 text-gray-500 invisible", { "visible": canBookmark })} />
}
