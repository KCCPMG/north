import { NextRequest } from "next/server";
import UserStory from "@/models/UserStory";



export async function POST(req: NextRequest, {params} : {params: {id: string}}) {

  try {

    const {story} = await req.json();
    console.log(JSON.stringify({"incoming user story" : story}, null, 2));

    const userStory = await UserStory.create(story);

    return Response.json(userStory);

  } catch(err) {
    console.log(err);
    return Response.error();
  }
}