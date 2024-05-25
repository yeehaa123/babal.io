import { useAuth, useUser, useSignIn } from '@clerk/clerk-react'

export function useOffCourseAuth() {
  const { isSignedIn, isLoaded } = useUser();
  const { signOut } = useAuth();
  const { signIn } = useSignIn();
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
