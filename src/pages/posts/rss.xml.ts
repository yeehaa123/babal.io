import rss from '@astrojs/rss';

import { getCollection } from 'astro:content';

interface Props {
  site: string
}

export async function GET(context: Props) {
  const posts = await getCollection('blog');
  return rss({
    title: 'Buzz’s Blog',
    description: 'A humble Astronaut’s guide to the stars',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.published_on,
      description: post.data.excerpt,
      link: `offcourse`,
    })),
  });
}
