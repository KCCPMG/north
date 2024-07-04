// TEMPLATE ONLY! DO NOT DELETE!

import mongoose from "mongoose";

// basic interface
export interface IThing {

}

// declare instance methods, define later
export interface IThingMethods {

}

// create a new model that incorporates IThing, declare static methods, define later
export interface ThingModel extends mongoose.Model<IThing, {}, IThingMethods> {

}

// main schema
const ThingSchema = new mongoose.Schema<IThing, ThingModel, IThingMethods>({ 

})


// back references
ThingSchema.virtual('other_things', {
  ref: "OtherThing",
  localField: "_id",
  foreignField: "things"
})

// define instance methods



// define static methods



// export model
export default mongoose.models.Thing as ThingModel || mongoose.model<IThing, ThingModel>("Thing", ThingSchema)