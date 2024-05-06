import { map } from 'nanostores'

export interface AppState {
  isSideBarOpen: boolean,
}

export const $appState = map<AppState>({ isSideBarOpen: false })

export function toggleSideBar() {
  const isSideBarOpen = $appState.get().isSideBarOpen;
  $appState.setKey('isSideBarOpen', !isSideBarOpen)
}

