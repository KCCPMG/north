import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth/next"

export default async function checkSession() {
  const session = await getServerSession();
  if (!session) {
    return new Response(
      JSON.stringify({Error: "You must be logged in to do that"}), 
      {
        status: 401
      }
    );
  }
}