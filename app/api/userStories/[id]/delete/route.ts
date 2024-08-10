import { NextRequest } from "next/server";
import mongooseConnect from "@/lib/mongooseConnect";
import checkSession from "@/lib/checkSession";
import { revalidatePath } from "next/cache";
import { deleteUserStoryAndRetrieveIssue } from "@/models/Controls";

export async function POST(req: NextRequest, {params} : {params: {id: string}}) {

  try {

    await mongooseConnect();

    const noSession = await checkSession();
    if (noSession) return noSession;

    const issue = await deleteUserStoryAndRetrieveIssue(params.id);

    revalidatePath('/issues', 'page');

    return Response.json(issue);

  } catch(err) {
    console.log(err);
    return Response.error();
  }

}