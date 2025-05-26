import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SessionWrapper from "@/component/SessionWrapper";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/component/Footer";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata:Metadata = {
  title: "TrackEx - Take Control of Your Finances",
  description:
    "Track expenses, manage budgets, and achieve your financial goals with our intuitive expense tracker app.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <SessionWrapper>

        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
          <Footer/>
          <Toaster/>
        </body>
      </SessionWrapper>

    </html>
  );
}
