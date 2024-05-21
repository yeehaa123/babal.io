import { useAuth, useUser, useSignIn } from '@clerk/clerk-react'
import { useEffect, } from "react"
import { useOffcourseContext } from './context';

export function useOffCourseAuth() {
  const { updateUser } = useOffcourseContext((state) => state.actions);
  const { isSignedIn, user, isLoaded } = useUser();
  const { signOut } = useAuth();
  const { signIn } = useSignIn();
  useEffect(() => {
    if (isSignedIn) {
      const userName = user.username || undefined;
      console.log(user);
      updateUser({ userName });
    }
  }, [isLoaded, isSignedIn])
  const authenticate = () => {
    const url = window.location.href
    return signIn?.authenticateWithRedirect({
      strategy: "oauth_github",
      redirectUrl: url,
      redirectUrlComplete: url
    })
  }
  return { isLoaded, isSignedIn, authenticate, signOut }
};
