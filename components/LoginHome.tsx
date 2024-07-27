"use client";
import { signIn, signOut } from "next-auth/react";

export default function LoginHome() {

  return (
    <button onClick={() => signIn()}>Sign In</button>
  )
}