import type { CoreState } from "@/containers/Offcourse";
import type { AuthData } from "@/stores/authState";
import type { Course } from "@/types";

export enum RoleTypes {
  GUEST = "GUEST",
  LEARNER = "LEARNER",
  COLLECTOR = "COLLECTOR",
  CURATOR = "CURATOR"
}
export function determineRole(
  { course, cardState, authData }: { course: Course, cardState: CoreState, authData: AuthData }) {
  const userName = authData?.userName;
  const { isBookmarked } = cardState;
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
