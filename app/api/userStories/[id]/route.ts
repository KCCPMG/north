import { NextRequest } from "next/server";
import UserStory from "@/models/UserStory";




export async function POST(req: NextRequest, {params} : {params: {id: string}}) {

  try {

    const json = await req.json();
    console.log(json);

    return Response.json(params.id);

  } catch(err) {
    console.log(err);
    return Response.error();
  }
}