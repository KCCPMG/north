import mongoose from "mongoose";

// basic interface
export interface IUserStory {
  issue: mongoose.Types.ObjectId,
  description: string,
  database_references: mongoose.Types.ObjectId[],
  links: mongoose.Types.ObjectId[],
  components: mongoose.Types.ObjectId[]


  // CRUD a database document
  // Link to a page
  // Render a component

  // Data Output
  // Included in Design
  // Included in Eng. File

  // User Input / Links
  // Included in Design
  // Included in Eng. File
}

// declare instance methods, define later
export interface IUserStoryMethods {

}

// create a new model that incorporates IUserStory, declare static methods, define later
export interface UserStoryModel extends mongoose.Model<IUserStory, {}, IUserStoryMethods> {

}

// main schema
const UserStorySchema = new mongoose.Schema<IUserStory, UserStoryModel, IUserStoryMethods>({ 
  issue: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  database_references: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "TableProperty"
  }],
  links: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Issue"
  }],
  components: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Issue"
  }]
})


// define instance methods



// define static methods



// export model
export default mongoose.models.UserStory as UserStoryModel || mongoose.model<IUserStory, UserStoryModel>("UserStory", UserStorySchema)