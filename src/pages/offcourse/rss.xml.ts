import rss from '@astrojs/rss';

import { getCollection } from 'astro:content';

interface Props {
  site: string
}

export async function GET(context: Props) {
  const courses = await getCollection('courses');
  return rss({
    title: 'Buzz’s Blog',
    description: 'A humble Astronaut’s guide to the stars',
    site: context.site,
    items: courses.map((course) => ({
      title: course.data.goal,
      pubDate: new Date('2023-06-04'),
      description: course.data.description,
      link: `offcourse`,
    })),
  });
}
