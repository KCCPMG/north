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
  // populateAll(): Promise<Array<PopulatedTableType>>
}

// main schema
const TableSchema = new mongoose.Schema<ITable, TableModel, ITableMethods>({ 
  name: {
    type: String,
    required: true
  }
}, {
  toJSON: {virtuals: true},
  toObject: {virtuals: true}
})

// back references
TableSchema.virtual('table_properties', {
  ref: TableProperty.modelName,
  localField: "_id",
  foreignField: "table"
})

// define instance methods


// define static methods
// TableSchema.static('populateAll', async function populateAll(): Promise<Array<PopulatedTableType>> {

//   const tables: Array<PopulatedTableType> = await this.find({})
//   .populate<{table_properties: Array<ITableProperty>}>({
//     path: 'table_properties',
//     select: 'field field_type special'
//   }); 

//   console.log(tables);

//   return tables;
// })





// export model
export default mongoose.models.Table as TableModel || mongoose.model<ITable, TableModel>("Table", TableSchema)