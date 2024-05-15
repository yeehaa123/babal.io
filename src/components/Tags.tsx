import { Badge } from "@/components/ui/badge"

export function Tags({ tags }: { tags: string[] }) {
  return <div className="flex flex-wrap gap-1">
    {tags.map(tag => <Badge variant="default" className="bg-gray-50 text-black font-normal hover:bg-black hover:text-white" key={tag}>{tag}</Badge>)}
  </div>
}
