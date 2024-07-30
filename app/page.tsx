import Image from "next/image";
import styles from "./page.module.css";
import { redirect } from 'next/navigation'
import { getServerSession } from "next-auth";
import LoginHome from "@/components/LoginHome";
import { getProviders } from "next-auth/react";

export default async function Home() {
  
  const session = await getServerSession();
  if (session) return redirect("/issues")

  const providers = await getProviders() || [];
  typeof providers;  // this looks like it got in by mistake, confirm and delete
  // else
  return (
    <LoginHome />
  )
}
