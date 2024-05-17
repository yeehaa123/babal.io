import {
  getLearnData
} from './learnDataDB';
import {
  getPerson,
  getPeople
} from "./people";
import {
  getTags
} from "./tags"
import {
  getCourse,
  getCourses
} from "./course";

async function authenticate(userName: string) {
  const curator = await getPerson({ alias: userName });
  return { userName: curator?.alias };
}

export {
  getCourse,
  authenticate,
  getLearnData,
  getPerson,
  getPeople,
  getTags,
  getCourses
}
