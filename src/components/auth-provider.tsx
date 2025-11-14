import {
  createContext,
  type PropsWithChildren,
  useContext,
  useMemo,
} from "react";
import { authClient } from "@/lib/auth/auth-client";

export type AuthSession = typeof authClient.$Infer.Session;

type AuthContextValue = {
  isAuthenticated: boolean;
  session: AuthSession | null;
  isPending: boolean;
};

// 1. Creates the context to hold auth state
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// 2. The provider fetches session data once
export function AuthProvider({ children }: PropsWithChildren) {
  const { data: session, isPending } = authClient.useSession();

  // 3. Memoizes the value to prevent unnecessary re-renders
  const value = useMemo<AuthContextValue>(
    () => ({
      isAuthenticated: !!session?.user,
      session: session ?? null,
      isPending,
    }),
    [session, isPending]
  );

  // 4. Provides this value to all children
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// 5. Custom hook for accessing auth state
export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
