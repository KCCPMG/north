import { NextRequest } from "next/server";
import mongooseConnect from "@/lib/mongooseConnect";
import checkSession from "@/lib/checkSession";
import { revalidatePath } from "next/cache";
import { updateUserStoryAndPopulateIssue } from "@/models/Controls";


export async function POST(req: NextRequest, {params} : {params: {id: string}}) {

  try {

    await mongooseConnect();

    const noSession = await checkSession();
    if (noSession) return noSession;

    const {story} = await req.json();

    const issue = await updateUserStoryAndPopulateIssue(params.id, story);

    // revalidate path prior to throwing error to clean up ghost user stories on client
    revalidatePath('/issues', 'page');

    if (!issue) throw new Error("userStory not found");

    return Response.json(issue);

  } catch(err) {
    console.log(err);
    return Response.error();
  }
}