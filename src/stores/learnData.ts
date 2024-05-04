import { batched, task } from 'nanostores';
import { $authState } from "@/stores/authState";

export const $learnState = batched($authState, ({ userName }) => task(async () => {
  if (userName) {
    return [true, false, false, true];
  }
  return;
}));
