import mongoose from "mongoose";

// basic interface
export interface ITableProperty {
  field: string,
  field_type: "Unique ID" | "Timestamp" | "Text" | "Integer" | "True/False" | "Date",
  special?: string,
  table: mongoose.Types.ObjectId
}

// declare instance methods, define later
export interface ITablePropertyMethods {

}

// create a new model that incorporates IProperty, declare static methods, define later
export interface TablePropertyModel extends mongoose.Model<ITableProperty, {}, ITablePropertyMethods> {

}

// main schema
const TablePropertySchema = new mongoose.Schema<ITableProperty, TablePropertyModel, ITablePropertyMethods>({ 
  field: {
    type: String,
    required: true
  },
  field_type: {
    type: String,
    enum: ["Unique ID", "Timestamp", "Text", "Integer", "True/False", "Date"],
    required: true
  },
  special: {
    type: String,
    required: false
  },
  table: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Table"
  }
}, {
  toJSON: {virtuals: true},
  toObject: {virtuals: true}
})

// back references



// define instance methods



// define static methods



// export model
export default mongoose.models.TableProperty as TablePropertyModel || mongoose.model<ITableProperty, TablePropertyModel>("TableProperty", TablePropertySchema)