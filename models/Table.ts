import mongoose from "mongoose";
import TableProperty, { ITableProperty } from "./TableProperty";

// basic interface
export interface ITable {
  name: string,
  table_properties: mongoose.Types.ObjectId[],
}

// declare instance methods, define later
export interface ITableMethods {

}

// create a new model that incorporates ITable, declare static methods, define later
export interface TableModel extends mongoose.Model<ITable, {}, ITableMethods> {
  populateAll(): Promise<Array<PopulatedTableType>>,
  goInsane(): Promise<void>
}

// main schema
const TableSchema = new mongoose.Schema<ITable, TableModel, ITableMethods>({ 
  name: {
    type: String,
    required: true
  },
  table_properties: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: TableProperty.name
  }],
})

// back references


// define instance methods


// define static methods
TableSchema.static('populateAll', async function populateAll(): Promise<Array<PopulatedTableType>> {

  const tables : Array<PopulatedTableType> = await this.find({})
  .populate<{table_properties: Array<ITableProperty>}>({
    path: 'table_properties',
    select: 'field field_type special'
  }); 

  console.log(tables);

  return tables;
})


TableSchema.static('goInsane', async function goInsane(): Promise<void> {
  const tables : Array<PopulatedTableType> = await this.find({})
  .populate<{table_properties: Array<ITableProperty>}>({
    path: 'table_properties',
    select: 'field field_type special'
  }); 

  console.log(JSON.stringify(tables, null, 2));
})

// extra types
export type PopulatedTableType = Omit<ITable, 'table_properties'> & {
  table_properties: Array<ITableProperty>
}



// export model
export default mongoose.models.Table as TableModel || mongoose.model<ITable, TableModel>("Table", TableSchema)