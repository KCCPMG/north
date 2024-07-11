import { NextRequest } from "next/server";
import Table from "@/models/Table";
import TableProperty, { ITableProperty } from "@/models/TableProperty";
import mongoose from "mongoose";
import Issue from "@/models/Table";
import { IUser } from "@/models/User";
import { IUserStory } from "@/models/UserStory";
import mongooseConnect from "@/lib/mongooseConnect";

export async function GET(req: NextRequest) {
  try {

    await mongooseConnect();

    const params = req.nextUrl.searchParams;
    console.log(params);
    const ref = params.get('ref');
    const query = req.nextUrl.searchParams.get('query');
    
    if (ref === 'tableRef') {

      const tables = await Table.find({name: query})
        .populate<{table_properties: Array<ITableProperty & {_id: mongoose.Types.ObjectId}>}>({
          path: 'table_properties',
          select: '_id field field_type special'
        });
      if (tables.length === 0) return Response.json("Document not found");
      else Response.json(tables[0]);
      
    } else if (ref === 'tablePropertyRef') {

      if (query?.indexOf(".") === -1 || !query) return Response.json("Document not found");

      const splitIndex = query.indexOf(".");
      const [tableName, propertyName] = [
        query.slice(0,splitIndex), query.slice(splitIndex+1)
      ]

      console.log({tableName, propertyName})

      const tableProperties = await TableProperty.find({field: propertyName})
      .populate<{table: {name: string, _id: mongoose.Types.ObjectId}}>({
        path: 'table',
        select: '_id name'
      })

      console.log(JSON.stringify(tableProperties, null, 2));

      if (tableProperties.length === 0) return Response.json("Document not found");
      else {
        for (let tp of tableProperties) {
          if (tp.table.name === tableName) return Response.json(tp);
        }
        return Response.json("Document not found");
      }
      
    } else if (ref === 'pageRef') {

      const pages = await Issue.find({name: query, issueType: "page"})
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
      if (pages.length === 0) return Response.json("Document not found");
      else return Response.json(pages[0]);
      
    } else if (ref === 'componentRef') {
      
      const components = await Issue.find({name: query, issueType: "component"})
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
      if (components.length === 0) return Response.json("Document not found");
      else return Response.json(components[0]);


    } else {
      return Response.error();
    }
    
    return Response.json(query);


  } catch (err) {
    console.log(err);
    throw err;
  }
}