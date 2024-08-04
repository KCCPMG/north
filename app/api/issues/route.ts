import mongooseConnect from "@/lib/mongooseConnect";
import { NextRequest } from "next/server";
import checkSession from "@/lib/checkSession";
import Issue from "@/models/Issue";




export async function POST(req: NextRequest) {

  try {
    await mongooseConnect();
    console.log("issues post")
    const noSession = await checkSession();
    if (noSession) return noSession;

    const json = await req.json();

    const issue = await Issue.create(json)
    await issue.populate([
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
    ])
      
    return Response.json(issue);

  } catch(err) {
    console.log(err);
    return Response.error();
  }
}