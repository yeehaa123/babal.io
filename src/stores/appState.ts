import { batched, map } from 'nanostores'
import { $registeredCoursesState } from './courses';

export interface AppState {
  isSideBarOpen: boolean,
}

const $coreState = map<AppState>({ isSideBarOpen: false })

export function toggleSideBar() {
  const isSideBarOpen = $coreState.get().isSideBarOpen;
  $coreState.setKey('isSideBarOpen', !isSideBarOpen)
}

export const $appState = batched(
  [$coreState, $registeredCoursesState],
  (state, courses) => {
    console.log(courses);
    return {
      ...state,
      courses
    }
  })
