import { NextRequest } from "next/server";
import User from "@/models/User";

export async function GET(req: NextRequest) {
  try {

    // get all users
    const users = await User.find({});

    return Response.json({users});

  } catch(err) {
    console.log(err);
    return Response.error();
  }
}