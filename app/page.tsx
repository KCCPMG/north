import Image from "next/image";
import styles from "./page.module.css";
import { redirect } from 'next/navigation'
import { getServerSession } from "next-auth";
import LoginHome from "@/components/LoginHome";

export default async function Home() {
  
  const session = await getServerSession();
  if (session) return redirect("/issues")

  // else
  return (
    <LoginHome />
  )
}
