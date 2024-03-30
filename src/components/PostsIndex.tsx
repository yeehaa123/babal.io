import type { CollectionEntry } from 'astro:content';
import PostInfo from "./PostInfo"
interface Props {
  posts: CollectionEntry<'blog'>[];
}

export default function Example({ posts }: Props) {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">From the blog</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Learn how to grow your business with our expert advice.
          </p>
          <div className="mt-10 space-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16">
            {posts.map((post) => (
              <PostInfo key={post.slug} post={post} />))}
          </div>
        </div>
      </div>
    </div>
  )
}

