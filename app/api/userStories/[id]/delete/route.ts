import UserStory from "@/models/UserStory";
import { NextRequest } from "next/server";
import mongooseConnect from "@/lib/mongooseConnect";
import authOptions from "@/app/lib/authOptions"
import { getServerSession } from "next-auth/next"
import checkSession from "@/lib/checkSession";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest, {params} : {params: {id: string}}) {

  try {

    await mongooseConnect();

    const noSession = await checkSession();
    if (noSession) return noSession;

    const {story} = await req.json();
    console.log(JSON.stringify({"incoming user story" : story}, null, 2));

    const deletedUserStory = await UserStory.findByIdAndDelete(params.id, {new: true}).populate({
      path: 'issue',
      select: '_id name description issueType assigned_designers assigned_engineers route_location design_figma_link eng_team_gh_issue_link eng_team_files design_complete eng_implementation_meets_design',
      populate: [
        {
          path: 'user_stories',
          select: '_id issue description database_references links components engineering_done design_done'
        },
        {
          path: 'assigned_designers',
          select: '_id email imageUrl registered active'
        },
        {
          path: 'assigned_engineers',
          select: '_id email imageUrl registered active'
        },
        {
          path: 'eng_implementation_meets_design.approving_designer',
          select: '_id email imageUrl registered active'
        }
      ]
    })

    if (!deletedUserStory) throw new Error("userStory not found");

    revalidatePath('/issues', 'page');

    return Response.json(deletedUserStory.issue);

  } catch(err) {
    console.log(err);
    return Response.error();
  }

}