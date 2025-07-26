"use client";

import { useUserSession } from "../contexts/UserSessionContext";

/**
 * Custom hook that provides a fetch function with user session parameters automatically included
 */
export const useApiWithSession = () => {
  const { userSession } = useUserSession();
  const { userId, sessionId, mcpSessionId } = userSession;

  /**
   * Fetch function that automatically includes user session parameters
   * @param url - The API endpoint URL (without session parameters)
   * @param options - Standard fetch options
   * @returns Promise with the fetch response
   */
  const fetchWithSession = async (url: string, options: RequestInit = {}) => {
    if (!userId || !sessionId || !mcpSessionId) {
      throw new Error("User session not available. Please log in again.");
    }

    // Add session parameters to URL
    const urlWithParams = new URL(url);
    urlWithParams.searchParams.append("userId", userId);
    urlWithParams.searchParams.append("sessionId", sessionId);
    urlWithParams.searchParams.append("mcpSessionId", mcpSessionId);

    return fetch(urlWithParams.toString(), options);
  };

  /**
   * Get session parameters as an object
   */
  const getSessionParams = () => ({
    userId,
    sessionId,
    mcpSessionId,
  });

  /**
   * Get session parameters as URL search params string
   */
  const getSessionParamsString = () => {
    if (!userId || !sessionId || !mcpSessionId) {
      return "";
    }
    return `userId=${userId}&sessionId=${sessionId}&mcpSessionId=${mcpSessionId}`;
  };

  /**
   * Check if session is available
   */
  const hasSession = !!(userId && sessionId && mcpSessionId);

  return {
    fetchWithSession,
    getSessionParams,
    getSessionParamsString,
    hasSession,
    userSession,
  };
};
