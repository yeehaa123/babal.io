import { writable } from 'svelte/store';


export const sideBarState = writable(false);
export function toggle() {
  sideBarState.update(x => !x);
}
