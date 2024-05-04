import { batched, task } from 'nanostores';
import { $authState } from "@/stores/authState";
import { $learnState } from "@/stores/learnData"

export type UserData = {
  userName: string | undefined;
  learnData: boolean[] | undefined;
}

export const $userState = batched(
  [$authState, $learnState],
  ({ userName }, learnData) => task(async () => {
    return { userName, learnData }
  }));

