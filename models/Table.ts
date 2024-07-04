import mongoose from "mongoose";

// basic interface
export interface ITable {
  name: string,
  
}

// declare instance methods, define later
export interface ITableMethods {

}

// create a new model that incorporates ITable, declare static methods, define later
export interface TableModel extends mongoose.Model<ITable, {}, ITableMethods> {

}

// main schema
const TableSchema = new mongoose.Schema<ITable, TableModel, ITableMethods>({ 

})


// define instance methods



// define static methods



// export model
export default mongoose.models.Table as TableModel || mongoose.model<ITable, TableModel>("Table", TableSchema)