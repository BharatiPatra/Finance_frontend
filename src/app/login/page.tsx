"use client";
import React, { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useUserSession } from "../../contexts/UserSessionContext";
// pages/login.tsx

const CLIENT_ID = "YOUR_CLIENT_ID";

export default function Login() {
  const router = useRouter();
  const [msg, setMsg] = useState(
    "Please enable pop-ups for this site. This will open the Fi Money login page in a new tab. After logging in, return to this tab to continue."
  );
  const { setUserSession, userSession } = useUserSession();

  useEffect(() => {
    if (
      userSession.userId &&
      userSession.sessionId &&
      userSession.mcpSessionId
    ) {
      return;
    } else {
      const storedSession = localStorage.getItem("userSession");
      if (storedSession) {
        const parsedSession = JSON.parse(storedSession);
        if (
          parsedSession.userId &&
          parsedSession.sessionId &&
          parsedSession.mcpSessionId
        ) {
          setUserSession(parsedSession);
          return;
        }
      }
    }
    const mcpSessionId = "mcp-session-sdf";
    const OAUTH_URL = `http://localhost:8080/mockWebPage?sessionId=${mcpSessionId}`;
    const newWindow = window.open(OAUTH_URL, "loginPopup");

    const timer = setInterval(() => {
      // Do backend call to check if login successful.
      // If successful, redirect to dashboard
      fetch("http://127.0.0.1:8000/security/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mcp_session_id: mcpSessionId }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.is_success) {
            clearInterval(timer);
            const userId = data.user_id;
            const sessionId = data.session_id;
            const mcpSessionId = data.mcp_session_id;
            // Set user session in context
            setUserSession({
              userId,
              sessionId,
              mcpSessionId,
            });

            // Redirect to dashboard (without query params since context handles it)
            router.replace("/");
          } else {
            if (newWindow?.closed) {
              clearInterval(timer);
              setMsg("Login failed, try to reload the page");
            }
          }
        })
        .catch(() => {
          clearInterval(timer);
          setMsg("Login failed, try to reload the page");
        });
    }, 1000);
  }, [router, setUserSession]);

  // You can show a spinner or “Logging you in…” message here
  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-lg">{msg}</p>
    </div>
  );
}
