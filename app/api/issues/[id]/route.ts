import Issue from "@/models/Issue";
import { NextRequest } from "next/server";
import { IUserStory } from "@/models/UserStory";
import mongoose from "mongoose";
import { IUser } from "@/models/User";


export async function GET(req: NextRequest, {params} : {params: {id: string}}) {
  try {
    
    const issue = await Issue.findById(params.id)
      .populate<{user_stories: Array<IUserStory & {_id: mongoose.Types.ObjectId}>}>({
        path: 'user_stories',
        select: '_id issue description database_references links components'
      })
      .populate<{assigned_designers: Array<IUser & {_id: mongoose.Types.ObjectId}>}>({
        path: 'assigned_designers',
        select: '_id email imageUrl registered active'
      })
      .populate<{assigned_engineers: Array<IUser & {_id: mongoose.Types.ObjectId}>}>({
        path: 'assigned_engineers',
        select: '_id email imageUrl registered active'
      })
      .populate<{eng_implementation_meets_design: {
        meets_design: boolean,
        approving_designer: IUser & {
          _id: mongoose.Types.ObjectId
        },
        approval_date: Date
      }}>({
        path: 'eng_implementation_meets_design.approving_designer',
        select: '_id email imageUrl registered active'
      });

    if (!issue) return new Response("Issue not found", {
      status: 400
    })

    return Response.json(JSON.parse(JSON.stringify(issue)));

  } catch (err) {
    console.log(err);
    return Response.error();
  }
}

export async function POST(req: NextRequest, {params} : {params: {id: string}}) {
  try {

    const json = await req.json();

    const issue = await Issue.findByIdAndUpdate(params.id, json)
      .populate<{user_stories: Array<IUserStory & {_id: mongoose.Types.ObjectId}>}>({
        path: 'user_stories',
        select: '_id issue description database_references links components'
      })
      .populate<{assigned_designers: Array<IUser & {_id: mongoose.Types.ObjectId}>}>({
        path: 'assigned_designers',
        select: '_id email imageUrl registered active'
      })
      .populate<{assigned_engineers: Array<IUser & {_id: mongoose.Types.ObjectId}>}>({
        path: 'assigned_engineers',
        select: '_id email imageUrl registered active'
      })
      .populate<{eng_implementation_meets_design: {
        meets_design: boolean,
        approving_designer: IUser & {
          _id: mongoose.Types.ObjectId
        },
        approval_date: Date
      }}>({
        path: 'eng_implementation_meets_design.approving_designer',
        select: '_id email imageUrl registered active'
      });

    if (!issue) return new Response("Issue not found", {
      status: 400
    })

    return Response.json(issue);

  } catch(err) {
    console.log(err);
    return Response.error();
  }
}