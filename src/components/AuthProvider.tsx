"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { getClientAuth, isFirebaseClientConfigured } from "@/lib/firebase/client-auth";

type AuthContextValue = {
  user: User | null;
  userId: string | null;
  isLoaded: boolean;
  isSignedIn: boolean;
  displayName: string | null;
  email: string | null;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue>({
  user: null,
  userId: null,
  isLoaded: false,
  isSignedIn: false,
  displayName: null,
  email: null,
  signOut: async () => undefined,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoaded, setIsLoaded] = useState(!isFirebaseClientConfigured());

  useEffect(() => {
    const auth = getClientAuth();
    if (!auth) {
      setIsLoaded(true);
      return;
    }
    return onAuthStateChanged(auth, (next) => {
      setUser(next);
      setIsLoaded(true);
    });
  }, []);

  const signOut = useCallback(async () => {
    const auth = getClientAuth();
    await fetch("/api/auth/session", { method: "DELETE" });
    if (auth) await auth.signOut();
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      userId: user?.uid ?? null,
      isLoaded,
      isSignedIn: Boolean(user),
      displayName: user?.displayName ?? user?.email?.split("@")[0] ?? null,
      email: user?.email ?? null,
      signOut,
    }),
    [user, isLoaded, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
