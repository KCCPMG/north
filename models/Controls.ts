import mongoose from "mongoose";
import Issue, { IIssue } from "./Issue";
import { IUser } from "./User";
import UserStory, { IUserStory } from "./UserStory";
import Table, { ITable } from "./Table";
import TableProperty, { ITableProperty } from "./TableProperty";
import mongooseConnect from "@/lib/mongooseConnect";



// types
export type PopulatedTableType = Omit<ITable, 'table_properties'> & {
  _id: mongoose.Types.ObjectId,
  table_properties: Array<ITableProperty & {
    _id: mongoose.Types.ObjectId
  }>
}

export type PopulatedIssueType = Omit<IIssue, 'assigned_designers' | 'assigned_engineers'> & {
  _id: mongoose.Types.ObjectId,
  user_stories: Array<IUserStory & {
    _id: mongoose.Types.ObjectId
  }>,
  assigned_designers: Array<IUser & {
    _id: mongoose.Types.ObjectId
  }>,
  assigned_engineers: Array<IUser & {
    _id: mongoose.Types.ObjectId
  }>,
}

// functions
export async function getPopulatedTables(): Promise<Array<PopulatedTableType>> {

  try {

    await mongooseConnect();

    const tables = await Table.find({})
      .populate<{table_properties: Array<ITableProperty & {_id: mongoose.Types.ObjectId}>}>({
        path: 'table_properties',
        select: '_id field field_type special'
      }); 

    // console.log(JSON.stringify(tables, null, 2));

    return tables;

  } catch(err) {
    console.log(err);
    throw err;
  }
}

export async function getPopulatedIssues(): Promise<Array<PopulatedIssueType>> {

  try {
    
    await mongooseConnect();

    const issues = await Issue.find({})
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
      });;

    return issues;

  } catch(err) {
    console.log(err);
    throw err;
  }
}