// app/layout.tsx
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import SessionWrapper from "../lib/SessionWrapper";
import Login from "./login/page";
import { getServerSession } from "next-auth"; // Or your auth util
import { authOptions } from "../app/api/auth/[...nextauth]/route";



const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata = {
  title: "FinAgent - Your Financial AI Assistant",
  description: "Manage your finances, investments, and get AI insights.",
};

export default  function RootLayout({ children }: { children: React.ReactNode }) {
  // Get the session (change this based on your auth system)
  // const session = await getServerSession(authOptions);

  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          {/* <SessionWrapper>
          {session ? (
            // User is authenticated: show full layout
            <div className="flex flex-col h-screen">
              <Header />
              <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <main className="flex-1 overflow-y-auto">
                  {children}
                </main>
              </div>
            </div>
          ) : (
            // User NOT authenticated: show ONLY login page
            <Login />
          
          )}
        </SessionWrapper>  */}
         <div className="flex flex-col h-screen">
              {/* <Header /> */}
              <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <main className="flex-1 overflow-y-auto">
                  {children}
                </main>
              </div>
            </div>
        
      </body>
    </html>
  );
}
