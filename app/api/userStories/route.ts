import mongoose from "mongoose";
import { IUserStory } from "@/models/UserStory";
import { IUser } from "@/models/User";
import { IIssue } from "@/models/Issue";
import { NextRequest } from "next/server";
import UserStory from "@/models/UserStory";



export async function POST(req: NextRequest, {params} : {params: {id: string}}) {

  try {

    const {story} = await req.json();
    console.log(JSON.stringify({"incoming user story" : story}, null, 2));

    const userStory = await UserStory.create(story);

    // const issue = await userStory.populate<IIssue & {_id: mongoose.Types.ObjectId}>({
    //   path: 'issue',
    //   select: '_id name description issueType assigned_designers assigned_engineers route_location design_figma_link eng_team_gh_issue_link eng_team_files design_complete eng_implementation_meets_design'
    // })

    // console.log(JSON.stringify({issue}, null, 2));


    await userStory.populate({
      path: 'issue',
      select: '_id name description issueType assigned_designers assigned_engineers route_location design_figma_link eng_team_gh_issue_link eng_team_files design_complete eng_implementation_meets_design',
      populate: [
        {
          path: 'user_stories',
          select: '_id issue description database_references links components'
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

    
    // await issue
    //   .populate<{user_stories: Array<IUserStory & {_id: mongoose.Types.ObjectId}>}>({
    //     path: 'user_stories',
    //     select: '_id issue description database_references links components'
    //   })
    // await issue.populate<{assigned_designers: Array<IUser & {_id: mongoose.Types.ObjectId}>}>({
    //   path: 'assigned_designers',
    //   select: '_id email imageUrl registered active'
    // })
    // await issue.populate<{assigned_engineers: Array<IUser & {_id: mongoose.Types.ObjectId}>}>({
    //   path: 'assigned_engineers',
    //   select: '_id email imageUrl registered active'
    // }),
    // await issue.populate<{eng_implementation_meets_design: {
    //   meets_design: boolean,
    //   approving_designer: IUser & {
    //     _id: mongoose.Types.ObjectId
    //   },
    //   approval_date: Date
    // }}>({
    //   path: 'eng_implementation_meets_design.approving_designer',
    //   select: '_id email imageUrl registered active'
    // })



    // await Promise.all([
    //   userStory.populate<{user_stories: Array<IUserStory & {_id: mongoose.Types.ObjectId}>}>({
    //     path: 'user_stories',
    //     select: '_id issue description database_references links components'
    //   }),
    //   userStory.populate<{assigned_designers: Array<IUser & {_id: mongoose.Types.ObjectId}>}>({
    //     path: 'assigned_designers',
    //     select: '_id email imageUrl registered active'
    //   }),
    //   userStory.populate<{assigned_engineers: Array<IUser & {_id: mongoose.Types.ObjectId}>}>({
    //     path: 'assigned_engineers',
    //     select: '_id email imageUrl registered active'
    //   }),
    //   userStory.populate<{eng_implementation_meets_design: {
    //     meets_design: boolean,
    //     approving_designer: IUser & {
    //       _id: mongoose.Types.ObjectId
    //     },
    //     approval_date: Date
    //   }}>({
    //     path: 'eng_implementation_meets_design.approving_designer',
    //     select: '_id email imageUrl registered active'
    //   })
    // ]);

    console.log(JSON.stringify({userStory}, null, 2));

    return Response.error();
    // return Response.json(userStory.issue);

  } catch(err) {
    console.log(err);
    return Response.error();
  }
}