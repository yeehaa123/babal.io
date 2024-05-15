import { Badge } from "@/components/ui/badge"

export function Tags({ tags }: { tags: string[] }) {
  return <div className="flex flex-wrap gap-1">
    {tags.map(tag => <Badge variant="outline" key={tag}>{tag}</Badge>)}
  </div>
}
