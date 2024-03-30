import type { CollectionEntry } from 'astro:content';
interface Props {
  post: CollectionEntry<'blog'>;
}

export default function Example({ post }: Props) {

  const { title, published_on, excerpt } = post.data;
  return (
    <article key={post.slug} className="flex max-w-xl flex-col items-start justify-between">
      <div className="flex items-center gap-x-4 text-xs">
        <time dateTime={String(published_on)} className="text-gray-500">
          {published_on.toDateString()}
        </time>
        <a
          href={''}
          className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
        >
          Yeehaa
        </a>
      </div>
      <div className="group relative">
        <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
          <a href={''}>
            <span className="absolute inset-0" />
            {title}
          </a>
        </h3>
        <p className="mt-5 text-sm leading-6 text-gray-600">{excerpt}</p>
      </div>
    </article>
  )
}

