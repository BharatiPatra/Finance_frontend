"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useSearchParams, useRouter } from "next/navigation";

interface UserSessionData {
  userId: string | null;
  sessionId: string | null;
  mcpSessionId: string | null;
}

interface UserSessionContextType {
  userSession: UserSessionData;
  setUserSession: (data: UserSessionData) => void;
  clearUserSession: () => void;
  isAuthenticated: boolean;
  updateFromUrl: () => void;
}
const localContext = localStorage.getItem("userSession");
const UserSessionContext = createContext<UserSessionContextType | undefined>(
  undefined
);

export const useUserSession = () => {
  const context = useContext(UserSessionContext);

  if (context === undefined) {
    throw new Error("useUserSession must be used within a UserSessionProvider");
  }
  return context;
};

interface UserSessionProviderProps {
  children: ReactNode;
}

export const UserSessionProvider: React.FC<UserSessionProviderProps> = ({
  children,
}) => {
  const [userSession, setUserSessionState] = useState<UserSessionData>({
    userId: null,
    sessionId: null,
    mcpSessionId: null,
  });

  const searchParams = useSearchParams();
  const router = useRouter();

  // Function to update session from URL parameters
  const updateFromUrl = () => {
    const userId = searchParams.get("userId");
    const sessionId = searchParams.get("sessionId");
    const mcpSessionId = searchParams.get("mcpSessionId");

    if (userId && sessionId && mcpSessionId) {
      setUserSessionState({
        userId,
        sessionId,
        mcpSessionId,
      });

      // Store in localStorage for persistence
      localStorage.setItem(
        "userSession",
        JSON.stringify({
          userId,
          sessionId,
          mcpSessionId,
        })
      );
    }
  };

  // Function to set user session and persist it
  const setUserSession = (data: UserSessionData) => {
    setUserSessionState(data);
    if (data.userId && data.sessionId && data.mcpSessionId) {
      localStorage.setItem("userSession", JSON.stringify(data));
    }
  };

  // Function to clear user session
  const clearUserSession = () => {
    setUserSessionState({
      userId: null,
      sessionId: null,
      mcpSessionId: null,
    });
    localStorage.removeItem("userSession");
  };

  // Check if user is authenticated
  const isAuthenticated = !!(
    userSession.userId &&
    userSession.sessionId &&
    userSession.mcpSessionId
  );

  // Load session from localStorage on mount
  useEffect(() => {
    const storedSession = localStorage.getItem("userSession");
    if (storedSession) {
      try {
        const parsedSession = JSON.parse(storedSession);
        setUserSessionState(parsedSession);
      } catch (error) {
        console.error("Error parsing stored session:", error);
        localStorage.removeItem("userSession");
      }
    }
  }, []);

  // Update session from URL parameters when they change
  useEffect(() => {
    updateFromUrl();
  }, [searchParams]);

  const contextValue: UserSessionContextType = {
    userSession,
    setUserSession,
    clearUserSession,
    isAuthenticated,
    updateFromUrl,
  };

  return (
    <UserSessionContext.Provider value={contextValue}>
      {children}
    </UserSessionContext.Provider>
  );
};
