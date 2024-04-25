import { map } from 'nanostores'
import { useStore } from '@nanostores/react' // or '@nanostores/preact'

export interface AppState {
  isSideBarOpen: boolean,
}

const $appState = map<AppState>({ isSideBarOpen: false })



export function useAppState() {
  const { isSideBarOpen } = useStore($appState)
  const toggleSideBar = () => $appState.setKey('isSideBarOpen', !isSideBarOpen)
  return {
    userName: "",
    isSideBarOpen,
    toggleSideBar
  }
}
