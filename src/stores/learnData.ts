import { batched, task } from 'nanostores';
import { $authState } from "@/stores/authState";

export const $learnData = batched($authState, ({ userName }) => task(async () => {
  console.log(userName);
  if (userName) {
    return [true, false, false, true];
  }
  return;
}));
