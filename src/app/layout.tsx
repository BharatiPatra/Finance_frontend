// app/layout.tsx
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { Provider } from "@radix-ui/react-tooltip";
import SessionWrapper from "../lib/SessionWrapper";
import LayoutContent from "../components/LayoutContent";
import { UserSessionProvider } from "@/contexts/UserSessionContext";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "FinAgent - Your Financial AI Assistant",
  description: "Manage your finances, investments, and get AI insights.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-900 text-gray-200`}
      >
        <SessionWrapper>
          <UserSessionProvider>
            <Provider>
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.2),rgba(255,255,255,0))]">
                <LayoutContent>{children}</LayoutContent>
              </div>
            </Provider>
          </UserSessionProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
