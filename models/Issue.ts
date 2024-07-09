import mongoose from "mongoose";
import UserStory from "./UserStory";
import User from "./User";

// basic interface
export interface IIssue {
  name: string,
  description: string,
  issueType: "component" | "page",
  assigned_designers: mongoose.Types.ObjectId[],
  assigned_engineers: mongoose.Types.ObjectId[],
  route_location?: string,
  design_figma_link?: string,
  eng_team_gh_issue_link?: string,
  eng_team_files: string[],
  // merge checklist
  design_complete: boolean,
  eng_implementation_complete: boolean,
  eng_implementation_meets_design: {
    meets_design: boolean,
    approving_designer: mongoose.Types.ObjectId,
    approval_date: Date
  }

}

// declare instance methods, define later
export interface IIssueMethods {

}

export interface IssueModel extends mongoose.Model<IIssue, {}, IIssueMethods> {

}

// main schema
const IssueSchema = new mongoose.Schema<IIssue, IssueModel, IIssueMethods>({ 
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  issueType: {
    type: String,
    enum: ["component", "page"],
    required: false
  },
  assigned_designers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: User.modelName    
  }],
  assigned_engineers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: User.modelName
  }],
  route_location: {
    type: String,
    required: false
  },
  design_figma_link: {
    type: String,
    required: false
  },
  eng_team_gh_issue_link: {
    type: String,
    required: false
  },
  eng_team_files: [{
    type: String,
  }],
  // merge checklist
  design_complete: {
    type: Boolean,
    default: false
  },
  eng_implementation_complete: {
    type: Boolean,
    default: false
  },
  eng_implementation_meets_design: {
    type: {
      meets_design: {
        type: Boolean,
        default: false
      },
      approving_designer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User.modelName
      },
      approval_date: {
        type: Date,
        required: false
      }
    }
  }
}, {
  toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
  toObject: { virtuals: true } // So `console.log()` and other functions that use `toObject()` include virtuals
})

console.log('UserStory.modelName: ', UserStory.modelName)

// back references
IssueSchema.virtual('user_stories', {
  ref: UserStory.modelName,
  localField: '_id',
  foreignField: 'issue'
})

// define instance methods



// define static methods



// export model
export default mongoose.models.Issue as IssueModel || mongoose.model<IIssue, IssueModel>("Issue", IssueSchema)