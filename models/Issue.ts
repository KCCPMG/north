import mongoose from "mongoose";

// basic interface
export interface IIssue {
  name: string,
  description: string,
  type?: "component" | "page",
  assigned_designers: mongoose.Types.ObjectId[],
  assigned_engineers: mongoose.Types.ObjectId[],
  route_location?: string,
  design_figma_link?: string,
  eng_team_gh_issue_link?: string,
  eng_team_files: string[],
  user_stories: mongoose.Types.ObjectId[],
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
  type: {
    type: String,
    enum: ["component", "page"],
    required: false
  },
  assigned_designers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"    
  }],
  assigned_engineers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
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
  user_stories: [{
    type: mongoose.Types.ObjectId,
    ref: "UserStory"
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
        ref: "User"
      },
      approval_date: {
        type: Date,
        required: false
      }
    }
  }
})

// back references
IssueSchema.virtual('user_stories', {
  ref: "UserStory",
  localField: "_id",
  foreignField: "issue"
})

// define instance methods



// define static methods



// export model
export default mongoose.models.Issue as IssueModel || mongoose.model<IIssue, IssueModel>("Issue", IssueSchema)