import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';


export const GET: APIRoute = ({ props }) => {
  const { id, data } = props.entry
  return new Response(
    JSON.stringify({
      id,
      ...data
    })
  )
}

export async function getStaticPaths() {
  const courseEntries = await getCollection('courses');
  return courseEntries.map(entry => {
    return {
      params: { slug: entry.id }, props: { entry }
    }
  })
};
