"use client"
import { SessionProvider } from "next-auth/react";

type ClientSessionProviderProps = {
  children: React.ReactNode
}

export default function ClientSessionProvider({children}: ClientSessionProviderProps) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}