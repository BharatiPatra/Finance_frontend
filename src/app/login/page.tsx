"use client";
import React, { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Login() {
  const { data: session, status } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Redirect to home when authenticated
    if (status === "authenticated" && session) {
      router.push("/");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (session) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Redirecting to dashboard...</p>
      </div>
    );
  }

  // Placeholder email/password login
  const handleEmailPasswordLogin = (e) => {
    e.preventDefault();
    console.log("Attempting to log in with:", { email, password });
    // Example: signIn('credentials', { email, password, callbackUrl: '/' });
    alert("Email/Password login not fully implemented in this example.");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-md p-6">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Welcome to Fi MCP
          </h1>
          <p className="text-md text-gray-600">
            The AI Powered personal finance assistant
          </p>
        </div>

        {/* Email and Password Login Form */}
        <form onSubmit={handleEmailPasswordLogin} className="space-y-4 mb-6">
          <div>
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign in
          </button>
        </form>

        {/* OR Separator */}
        <div className="relative flex justify-center text-sm mb-6">
          <span className="bg-white px-2 text-gray-500">Or continue with</span>
          <div className="absolute inset-x-0 top-1/2 h-px bg-gray-200 -z-10"></div>
        </div>

        {/* Google Login Button */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => signIn("google")}
            type="button"
            className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition"
          >
            <svg
              className="w-5 h-5 mr-2"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M44.5 20H24V28H35.8C35.1 31.7 32.5 34.6 29 36.3V42.3C35.2 40 40 33.7 40 26C40 24 39.7 22 39.2 20H44.5Z"
                fill="#4285F4"
              />
              <path
                d="M24 44C30.6 44 36.2 41.8 40 38.3L34.3 33C32.1 34.6 28.5 35.7 24 35.7C17.6 35.7 12.1 31.5 10 25.4L4.7 29.5C7.9 36.3 15.3 40 24 40C29 40 33.4 38.6 36.9 36.3V44H24V44Z"
                fill="#34A853"
              />
              <path
                d="M10 25.4C9.5 24.3 9.2 23.2 9.2 22C9.2 20.8 9.5 19.7 10 18.6L4.7 14.5C3.1 17.7 2.2 20.8 2.2 24C2.2 27.2 3.1 30.3 4.7 33.5L10 25.4Z"
                fill="#FBBC05"
              />
              <path
                d="M24 8.3C27.3 8.3 30.3 9.6 32.7 11.8L37.1 7.4C33.4 4.5 28.9 2.2 24 2.2C15.3 2.2 7.9 5.9 4.7 12.8L10 16.9C12.1 10.8 17.6 6.6 24 6.6Z"
                fill="#EA4335"
              />
            </svg>
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
}