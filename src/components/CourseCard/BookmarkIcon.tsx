import { cn } from "@/lib/utils"
import { BookmarkIcon, BookmarkFilledIcon } from '@radix-ui/react-icons'
type Props = {
  isBookmarked: boolean,
  isBookmarkable: boolean,
  toggle: () => void
}

export default function Bookmark({
  isBookmarked,
  toggle,
  isBookmarkable
}: Props) {
  const Icon = isBookmarked
    ? BookmarkFilledIcon
    : BookmarkIcon
  return <Icon onClick={toggle} className={
    cn("h-8 w-8 text-gray-500 invisible", { "visible": isBookmarkable })} />
}
