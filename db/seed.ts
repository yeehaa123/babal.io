import { db, People, Socials, Courses, Checkpoints } from 'astro:db';

import slugify from '@sindresorhus/slugify';

async function prepPeople() {
  const rawPeople = [{
    alias: "Yeehaa", socials: {
      linkedin: "https://www.linkedin.com/in/yeehaa/"
    }
  }];
  const people = rawPeople.map(p => ({ alias: p.alias }));
  const socials = rawPeople.map(p => ({ alias: p.alias, ...p.socials }));
  return { people, socials }
}


async function prepCourses() {
  const rawCourses = [{
    goal: "Engineer breakthroughs",
    curator: "Yeehaa",
    habitat: "/cases/engineering-breakthrough-moments",
    description: "At critical moments, scaling requires outside help.But asking for help is difficult if you do not know what you need.This course helps you figure it out.",
    checkpoints: [
      {
        task: "Discover your personal strengths",
        href: "https://80000hours.org/articles/personal-strengths/"
      },
      {
        task: "Embrace your weaknesses",
        href: "https://maven.com/articles/identifying-greatest-weakness",
      },
      {
        task: "Do a SWOT analysis of your startup",
        href: "https://fullscale.io/blog/swot-analysis-for-startups/"
      },
      {
        task: "Formulate your critical ask",
        href: "https://www.42workspace.com/guide/superconnectors-in-rotterdam/"
      }]
  }]
  const courses = rawCourses
    .map((course) => {
      const { habitat, goal, ...rest } = course;
      const id = slugify(goal);
      return { id, goal, habitat: habitat || null, ...rest }
    });

  const checkpoints = courses
    .flatMap(({ id, checkpoints }) => {
      return checkpoints.flatMap(checkpoint => {
        return { courseId: id, ...checkpoint }
      })
    })
  return { courses, checkpoints }
}

export default async function() {
  const { people, socials } = await prepPeople();
  const { courses, checkpoints } = await prepCourses();

  await db.insert(People).values(people);
  await db.insert(Socials).values(socials);
  await db.insert(Courses).values(courses);
  await db.insert(Checkpoints).values(checkpoints);
}
