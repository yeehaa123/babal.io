import type { AugmentedCourse, } from "@/components/CourseCard/";
import type { AuthData } from '@/stores/authState';

export enum RoleTypes {
  GUEST = "GUEST",
  LEARNER = "LEARNER",
  COLLECTOR = "COLLECTOR",
  CURATOR = "CURATOR"
}


type CardProps = {
  course: AugmentedCourse,
  authData: AuthData
}

export function determineRole(
  { course, authData }: CardProps) {
  const { userName } = authData;
  const { isBookmarked } = course;
  const isAuthenticated = !!userName;
  const isCurator = !!(course?.curator && userName === course.curator.alias);
  if (isAuthenticated) {
    if (isCurator) {
      return RoleTypes.CURATOR;
    } else if (isBookmarked) {
      return RoleTypes.COLLECTOR;
    } else {
      return RoleTypes.LEARNER;
    }
  } else {
    return RoleTypes.GUEST;
  }
}
