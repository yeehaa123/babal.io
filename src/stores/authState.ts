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

export const setAuthenticated = ({ userName }: AuthData) => $state.setKey("userName", userName)
