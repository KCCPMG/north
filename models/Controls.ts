import mongoose from "mongoose";
import Issue from "./Issue";
import Table, { ITable } from "./Table";
import TableProperty, { ITableProperty } from "./TableProperty";
import mongooseConnect from "@/lib/mongooseConnect";



// types
export type PopulatedTableType = Omit<ITable, 'table_properties'> & {
  table_properties: Array<ITableProperty & {
    _id: mongoose.Types.ObjectId
  }>
}


// functions
export async function getPopulatedTables() {

  try {

    await mongooseConnect();

    const tables = await Table.find({})
      .populate<{table_properties: Array<ITableProperty>}>({
        path: 'table_properties',
        select: '_id field field_type special'
      }); 

    // console.log(tables);
    console.log(JSON.stringify(tables, null, 2));

    return tables;

  } catch(err) {
    console.log(err);
    throw err;
  }
}