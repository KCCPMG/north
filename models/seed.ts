import dotenv from "dotenv";
import mongoose from "mongoose";
import mongooseConnect from "@/lib/mongooseConnect";
import User from "./User";
import Issue, { IIssue } from "./Issue";
import Table from "./Table";
import TableProperty from "./TableProperty";
import UserStory from "./UserStory";
import { getPopulatedIssues } from "./Controls";


async function seedTables() {

  await Table.deleteMany({});
  await TableProperty.deleteMany({});

  // User Table
  const user_table = await Table.create({name: "User"})
  const user_table_properties = await Promise.all([
    TableProperty.create({
      field: "user_id",
      field_type: "Unique ID",
      special: "Required, autogenerated" 
    }),
    TableProperty.create({
      field: "first_name",
      field_type: "Text",
      special: "Required"
    }),
    TableProperty.create({
      field: "last_name",
      field_type: "Text",
      special: "Required"
    }),
    TableProperty.create({
      field: "role",
      field_type: "Text",
      special: "Required, either “staff” or “admin”"
    }),
    TableProperty.create({
      field: "email",
      field_type: "Text",
      special: "Required"
    }),
    TableProperty.create({
      field: "email_verified_at",
      field_type: "Timestamp",
      special: ""
    }),
    TableProperty.create({
      field: "image_url",
      field_type: "Text",
      special: ""
    })
  ])
  user_table.table_properties = user_table_properties.map(tp => tp._id);
  await user_table.save();


  // Paras Assigned To Case Managers Table
  const paras_to_cms_table = await Table.create({name: "Paras Assigned to Case Managers"});
  const paras_to_cms_table_properties = await Promise.all([
    TableProperty.create({
      field: "case_manager_id",
      field_type: "Unique ID",
      special: "Reference to 'user'"
    }),
    TableProperty.create({
      field: "para_id",
      field_type: "Unique ID",
      special: "Reference to 'user'"
    }),
  ])
  paras_to_cms_table.table_properties = paras_to_cms_table_properties.map(tp => tp._id);
  await paras_to_cms_table.save();


  // Account Table
  const account_table = await Table.create({name: "Account"});
  const account_table_properties = await Promise.all([
    TableProperty.create({
      field: "account_id",
      field_type: "Unique ID",
      special: "Required, autogenerated"
    }),
    TableProperty.create({
      field: "user_id",
      field_type: "Unique ID",
      special: "Reference to “user”"
    }),
    TableProperty.create({
      field: "provider_name",
      field_type: "Text",
      special: "Required"
    }),
    TableProperty.create({
      field: "provider_account_id",
      field_type: "Text",
      special: "Required, unique combination with provider_name"
    }),
    TableProperty.create({
      field: "access_token",
      field_type: "Text",
      special: ""
    }),
    TableProperty.create({
      field: "refresh_token",
      field_type: "Text",
      special: ""
    }),
    TableProperty.create({
      field: "expires_at",
      field_type: "Integer",
      special: ""
    }),
    TableProperty.create({
      field: "token_type",
      field_type: "Text",
      special: ""
    }),
    TableProperty.create({
      field: "scope",
      field_type: "Text",
      special: ""
    }),
    TableProperty.create({
      field: "id_token",
      field_type: "Text",
      special: ""
    }),
    TableProperty.create({
      field: "session_state",
      field_type: "Text",
      special: ""
    }),
  ])
  account_table.table_properties = account_table_properties.map(tp => tp._id);
  await account_table.save();

  // Session Table
  const session_table = await Table.create({name: "Session"});
  const session_table_properties = await Promise.all([
    TableProperty.create({
      field: "session_id",
      field_type: "Unique ID",
      special: "Required, autogenerated"
    }),
    TableProperty.create({
      field: "session_token",
      field_type: "Text",
      special: "Required, Unique"
    }),
    TableProperty.create({
      field: "user_id",
      field_type: "Text",
      special: "Required, reference to “user”"
    }),
    TableProperty.create({
      field: "expires_at",
      field_type: "Timestamp",
      special: "Required"
    }),
  ])
  session_table.table_properties = session_table_properties.map(tp => tp._id);
  await session_table.save();


  // Student Table
  const student_table = await Table.create({name: "Student"});
  const student_table_properties = await Promise.all([
    TableProperty.create({
      field: "student_id",
      field_type: "Unique ID",
      special: "Required, autogenerated"
    }),
    TableProperty.create({
      field: "first_name",
      field_type: "Text",
      special: "Required"
    }),
    TableProperty.create({
      field: "last_name",
      field_type: "Text",
      special: "Required"
    }),
    TableProperty.create({
      field: "email",
      field_type: "Text",
      special: "Required"
    }),
    TableProperty.create({
      field: "assigned_case_manager_id",
      field_type: "Timestamp",
      special: "References “user”"
    }),
    TableProperty.create({
      field: "grade",
      field_type: "Integer",
      special: ""
    }),
  ])
  student_table.table_properties = student_table_properties.map(tp => tp._id);
  await student_table.save();


  // File Table
  const file_table = await Table.create({name: "File"});
  const file_table_properties = await Promise.all([
    TableProperty.create({
      field: "file_id",
      field_type: "Unique ID",
      special: "Required, autogenerated"
    }),
    TableProperty.create({
      field: "name",
      field_type: "Text",
      special: "Required"
    }),
    TableProperty.create({
      field: "content_type",
      field_type: "Text",
      special: "Required"
    }),
    TableProperty.create({
      field: "ext_s3_path",
      field_type: "Text",
      special: "Required, either “staff” or “admin”"
    }),
    TableProperty.create({
      field: "uploaded_by_user_id",
      field_type: "Text",
      special: "Required"
    }),
    TableProperty.create({
      field: "created_at",
      field_type: "Timestamp",
      special: "Required, autogenerated"
    }),
  ])
  file_table.table_properties = file_table_properties.map(tp => tp._id);
  await file_table.save();


  // Iep Table
  const iep_table = await Table.create({name: "Iep"});
  const iep_table_properties = await Promise.all([
    TableProperty.create({
      field: "iep_id",
      field_type: "Unique ID",
      special: "Required, autogenerated"
    }),
    TableProperty.create({
      field: "student_id",
      field_type: "Unique ID",
      special: "References “student”"
    }),
    TableProperty.create({
      field: "case_manager_id",
      field_type: "Unique ID",
      special: "References “user”"
    }),
    TableProperty.create({
      field: "start_date",
      field_type: "Date",
      special: "Required"
    }),
    TableProperty.create({
      field: "end_date",
      field_type: "Date",
      special: "Required"
    }),
    TableProperty.create({
      field: "created_at",
      field_type: "Timestamp",
      special: "Required, autogenerated"
    }),
  ])
  iep_table.table_properties = iep_table_properties.map(tp => tp._id);
  await iep_table.save();


  // Goal Table
  const goal_table = await Table.create({name: "Goal"});
  const goal_table_properties = await Promise.all([
    TableProperty.create({
      field: "goal_id",
      field_type: "Unique ID",
      special: "Required, autogenerated"
    }),
    TableProperty.create({
      field: "iep_id",
      field_type: "Unique ID",
      special: "References “iep”"
    }),
    TableProperty.create({
      field: "description",
      field_type: "Text",
      special: "Required"
    }),
    TableProperty.create({
      field: "category",
      field_type: "Text",
      special: "Required, either 'writing', 'reading', 'math', or 'other'"
    }),
    TableProperty.create({
      field: "created_at",
      field_type: "Timestamp",
      special: "Required, autogenerated"
    }),
  ])
  goal_table.table_properties = goal_table_properties.map(tp => tp._id);
  await goal_table.save();


  // Subgoal Table
  const subgoal_table = await Table.create({name: "Subgoal"});
  const subgoal_table_properties = await Promise.all([
    TableProperty.create({
      field: "subgoal_id",
      field_type: "Unique ID",
      special: "Required, autogenerated"
    }),
    TableProperty.create({
      field: "goal_id",
      field_type: "Unique ID",
      special: "References “goal”"
    }),
    TableProperty.create({
      field: "status",
      field_type: "Text",
      special: "Either “In Progress” or “Complete”"
    }),
    TableProperty.create({
      field: "description",
      field_type: "Text",
      special: "Required"
    }),
    TableProperty.create({
      field: "setup",
      field_type: "Text",
      special: "Required"
    }),
    TableProperty.create({
      field: "instructions",
      field_type: "Text",
      special: "Required"
    }),
    TableProperty.create({
      field: "materials",
      field_type: "Text",
      special: "Required"
    }),
    TableProperty.create({
      field: "target_level",
      field_type: "Integer",
      special: "Required (between 0 and 100)"
    }),
    TableProperty.create({
      field: "baseline_level",
      field_type: "Integer",
      special: "Required (between 0 and 100)"
    }),
    TableProperty.create({
      field: "current_level",
      field_type: "Integer",
      special: "To be calculated as trial data is collected, never input by the user (between 0 and 100)"
    }),
    TableProperty.create({
      field: "metric_name",
      field_type: "Text",
      special: "Required"
    }),
    TableProperty.create({
      field: "attempts_per_trial",
      field_type: "Integer",
      special: "How many questions to administer in a single sitting"
    }),
    TableProperty.create({
      field: "number_of_trials",
      field_type: "Integer",
      special: ""
    }),
    TableProperty.create({
      field: "created_at",
      field_type: "Timestamp",
      special: "Required, autogenerated"
    }),
  ])
  subgoal_table.table_properties = subgoal_table_properties.map(tp => tp._id);
  await subgoal_table.save();


  // Task Table
  const task_table = await Table.create({name: "Task"});
  const task_table_properties = await Promise.all([
    TableProperty.create({
      field: "task_id",
      field_type: "Unique ID",
      special: "Required, autogenerated"
    }),
    TableProperty.create({
      field: "subgoal_id",
      field_type: "Unique ID",
      special: "References “subgoal”"
    }),
    TableProperty.create({
      field: "assignee_id",
      field_type: "Unique ID",
      special: "References “user”"
    }),
    TableProperty.create({
      field: "due_date",
      field_type: "Timestamp",
      special: ""
    }),
    TableProperty.create({
      field: "trial_count",
      field_type: "Integer",
      special: ""
    }),
    TableProperty.create({
      field: "seen",
      field_type: "True/False",
      special: "Required, default false"
    }),
  ])
  task_table.table_properties = task_table_properties.map(tp => tp._id);
  await task_table.save();


  // Trial Data Table
  const trial_data_table = await Table.create({name: "Trial Data"});
  const trial_data_table_properties = await Promise.all([
    TableProperty.create({
      field: "trial_data_id",
      field_type: "Unique ID",
      special: "Required, autogenerated"
    }),
    TableProperty.create({
      field: "task_id",
      field_type: "Unique ID",
      special: "References “task”"
    }),
    TableProperty.create({
      field: "created_by_user_id",
      field_type: "Unique ID",
      special: "References “user”"
    }),
    TableProperty.create({
      field: "success",
      field_type: "Integer",
      special: "Required"
    }),
    TableProperty.create({
      field: "unsuccess",
      field_type: "Integer",
      special: "Required"
    }),
    TableProperty.create({
      field: "submitted",
      field_type: "True/False",
      special: "Required, default false"
    }),
    TableProperty.create({
      field: "notes",
      field_type: "Text",
      special: ""
    }),
    TableProperty.create({
      field: "created_at",
      field_type: "Timestamp",
      special: "Required, autogenerated"
    }),
  ])
  trial_data_table.table_properties = trial_data_table_properties.map(tp => tp._id);
  await trial_data_table.save();


  // Trial Data File Table
  const trial_data_file_table = await Table.create({name: "Trial Data File"});
  const trial_data_file_table_properties = await Promise.all([
    TableProperty.create({
      field: "trial_file_id",
      field_type: "Unique ID",
      special: "Required, autogenerated"
    }),
    TableProperty.create({
      field: "trial_data_id",
      field_type: "Unique ID",
      special: "References “trial_data”"
    }),
    TableProperty.create({
      field: "file_id",
      field_type: "Unique ID",
      special: "References “file”"
    }),
    TableProperty.create({
      field: "created_at",
      field_type: "Timestamp",
      special: "Required, autogenerated"
    }),
  ])
  trial_data_file_table.table_properties = trial_data_file_table_properties.map(tp => tp._id);
  await trial_data_file_table.save();


  // check
  const populated_tables = await Promise.all([
    user_table.populate({
      path: 'table_properties',
      select: 'field field_type special'
    }),
    paras_to_cms_table.populate({
      path: 'table_properties',
      select: 'field field_type special'
    }),
    account_table.populate({
      path: 'table_properties',
      select: 'field field_type special'
    }),
    session_table.populate({
      path: 'table_properties',
      select: 'field field_type special'
    }),
    student_table.populate({
      path: 'table_properties',
      select: 'field field_type special'
    }),
    file_table.populate({
      path: 'table_properties',
      select: 'field field_type special'
    }),
    iep_table.populate({
      path: 'table_properties',
      select: 'field field_type special'
    }),
    goal_table.populate({
      path: 'table_properties',
      select: 'field field_type special'
    }),
    subgoal_table.populate({
      path: 'table_properties',
      select: 'field field_type special'
    }),
    task_table.populate({
      path: 'table_properties',
      select: 'field field_type special'
    }),
    trial_data_table.populate({
      path: 'table_properties',
      select: 'field field_type special'
    }),
    trial_data_file_table.populate({
      path: 'table_properties',
      select: 'field field_type special'
    }),
  
  ])

  console.log(JSON.stringify(populated_tables, null, 2));

}


async function seedIssues() {

  await Issue.deleteMany({});
  await UserStory.deleteMany({});

  const connor = await User.create({
    email: "connorwales@gmail.com",
    registered: true,
    active: true
  })

  const CM_CollectingDataStep1 = await Issue.create({
    name: "CM - Collecting Data Step 1",
    issueType: "page",
    description: "Step 1 in the desktop view of collecting data - outlining information to be known by CM or para in advance of data collection",
    type: "page",
    design_figma_link: "https://www.figma.com/design/m09znscRXNqSziAiEbNLTf/Compass-Designs?node-id=10411-66810&t=iwmoiYf1zfthSjMG-0",
    assigned_engineers: [connor._id],
    design_complete: true
  })

  console.log("issue created");

  const CM_CollectingDataStep1UserStories = await Promise.all([
    UserStory.create({
      issue: CM_CollectingDataStep1._id,
      description: [
        {
          textType: "string",
          text: "View the "
        },
        {
          textType: "tablePropertyRef",
          text: "Goal.created_at"
        }
      ],
    }),
    UserStory.create({
      issue: CM_CollectingDataStep1._id,
      description: [
        {
          textType: "string",
          text: "View the "
        },
        {
          textType: "tablePropertyRef",
          text: "Goal.description"
        }
      ],
    }),
    UserStory.create({
      issue: CM_CollectingDataStep1._id,
      description: [
        {
          textType: "string",
          text: "View the "
        },
        {
          textType: "tablePropertyRef",
          text: "Subgoal.materials"
        }
      ]
    }),
    UserStory.create({
      issue: CM_CollectingDataStep1._id,
      description: [
        {
          textType: "string",
          text: "View the "
        },
        {
          textType: "tablePropertyRef",
          text: "Subgoal.instructions"
        }
      ]
    }),
    UserStory.create({
      issue: CM_CollectingDataStep1._id,
      description: [
        {
          textType: "string",
          text: "View the "
        },
        {
          textType: "tablePropertyRef",
          text: "Subgoal.frequency"
        }
      ]
    }),
    UserStory.create({
      issue: CM_CollectingDataStep1._id,
      description: [
        {
          textType: "string",
          text: "Link to the "
        },
        {
          textType: "pageRef",
          text: "Edit Goal Page"
        },
      ]
    }),
    UserStory.create({
      issue: CM_CollectingDataStep1._id,
      description: [
        {
          textType: "string",
          text: "Have a button that clicks through to the "
        },
        {
          textType: "pageRef",
          text: "CM - Collecting Data Step 2"
        },
        {
          textType: "string",
          text: " page"
        }
      ]
    })
  ]);

  console.log("user stories created and assigned");

  // check
  const populated_issues = await getPopulatedIssues();
  console.log(JSON.stringify(populated_issues, null, 2));

  return;

}

async function run() {

  // mongoose setup
  dotenv.config({path: ".env.local"});
  await mongooseConnect();

  // await seedTables();
  await seedIssues();

  await mongoose.disconnect();
}

run();













