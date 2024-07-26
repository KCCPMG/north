import { NextRequest } from "next/server";
import User from "@/models/User";
import mongooseConnect from "@/lib/mongooseConnect";

export async function GET(req: NextRequest) {
  try {

    await mongooseConnect();

    // get all users
    const users = await User.find({});

    return Response.json({users});

  } catch(err) {
    console.log(err);
    return Response.error();
  }
}