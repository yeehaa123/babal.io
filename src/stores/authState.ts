import { map, computed } from 'nanostores';

export type AuthData = {
  userName: string | undefined;
}

const $state = map<AuthData>({ userName: undefined })

export const $authState = computed($state,
  ({ userName }) => {
    return {
      userName,
      isAuthenticated: !!userName
    }
  }
);

export async function login() {
  const response = await fetch('/authenticate.json', { method: "POST" });
  const { userName }: AuthData = await response.json();
  $state.setKey("userName", userName)
}

export async function logout() {
  $state.setKey("userName", undefined);
}
