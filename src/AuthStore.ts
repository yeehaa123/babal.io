import { useState } from "react";

type AuthData = {
  userName: string | undefined;
}

export type Auth = {
  isAuthenticated: boolean,
  authData: AuthData,
  setAuthenticated: (authData: AuthData) => void
}


export default function useAuthStore() {
  const [authData, setAuthenticated] = useState<AuthData>({ userName: undefined });

  const isAuthenticated = !!authData.userName

  return {
    isAuthenticated,
    authData,
    setAuthenticated,
  }
}
