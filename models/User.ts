// TEMPLATE ONLY! DO NOT DELETE!

import mongoose from "mongoose";

// basic interface
export interface IUser {
  name: string,
  email: string,
  imageUrl?: string,
  registered: boolean,
  active: boolean
}

// declare instance methods, define later
export interface IUserMethods {

}

// create a new model that incorporates IUser, declare static methods, define later
export interface UserModel extends mongoose.Model<IUser, {}, IUserMethods> {

}

// main schema
const UserSchema = new mongoose.Schema<IUser, UserModel, IUserMethods>({ 
  // when a user is created, they are invited
  // when a user first logs in, they become registered and active
  // when a user is deactivated, they become registered and no longer active
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  imageUrl: {
    type: String,
    required: false,
  },
  registered: {
    type: Boolean,
    default: false
  },
  active: {
    type: Boolean,
    default: false
  }
})


// back references
UserSchema.virtual('assigned_design_issues', {
  ref: "Issue",
  localField: "_id",
  foreignField: "assigned_designers"
})

UserSchema.virtual('assigned_engineering_issues', {
  ref: "Issue",
  localField: "_id",
  foreignField: "assigned_engineers"
})


// define instance methods



// define static methods



// export model
export default mongoose.models.User as UserModel || mongoose.model<IUser, UserModel>("User", UserSchema)