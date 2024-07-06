import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientSessionProvider from "@/context/ClientSessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "North",
  description: "A Project Management Tool for Compass",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClientSessionProvider>
        <body className={inter.className}>{children}</body>
      </ClientSessionProvider>
    </html>
  );
}
