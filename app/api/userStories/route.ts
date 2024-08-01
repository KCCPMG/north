import mongoose from "mongoose";
import { IUserStory } from "@/models/UserStory";
import { IUser } from "@/models/User";
import { IIssue } from "@/models/Issue";
import { NextRequest } from "next/server";
import UserStory from "@/models/UserStory";
import mongooseConnect from "@/lib/mongooseConnect";
import checkSession from "@/lib/checkSession";



export async function POST(req: NextRequest, {params} : {params: {id: string}}) {

  try {

    await mongooseConnect();

    const noSession = await checkSession();
    if (noSession) return noSession;

    const {story} = await req.json();

    const userStory = await UserStory.create(story);

    await userStory.populate({
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

    return Response.json(userStory.issue);

  } catch(err) {
    console.log(err);
    return Response.error();
  }
}