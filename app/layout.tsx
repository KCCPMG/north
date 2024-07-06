import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientSessionProvider from "@/context/ClientSessionProvider";
import mongooseConnect from "@/lib/mongooseConnect";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "North",
  description: "A Project Management Tool for Compass",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  await mongooseConnect();

  return (
    <html lang="en">
      <ClientSessionProvider>
        <body className={inter.className}>{children}</body>
      </ClientSessionProvider>
    </html>
  );
}
