"use client";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import { IUserStory } from "@/models/UserStory"
import { useIssueContext } from "@/context/IssueContext"
import QueryTooltip from "./QueryTooltip";
import { v4 as uuidv4 } from 'uuid';
import EditIcon from '@mui/icons-material/Edit';
import { Dispatch, SetStateAction, useState } from "react";
import UserStoryDialog from "./Dialogs/UserStoryDialog";
import { useSession } from "next-auth/react";
import IssueCheckbox from "./IssueCheckbox";
import { saveUserStory } from "@/lib/api";



type UserStoryProps = {
  story: IUserStory & { _id: string }
  showUserStoryDialog: boolean,
  setShowUserStoryDialog: Dispatch<SetStateAction<boolean>>,
  refresh: () => void
}

export default function UserStory({ story, refresh }: UserStoryProps) {

  const { setIssue } = useIssueContext();
  const { data: session } = useSession();
  const [showUserStoryDialog, setShowUserStoryDialog] = useState(false);
  const [showEditIcon, setShowEditIcon] = useState(false);

  const joinedDescription = story.description.map(des => {
    if (des.textType === "string") {
      return des.text
    } else return (
      <QueryTooltip
        textType={des.textType}
        text={des.text}
        key={uuidv4()}
      />
    )
  })

  const {
    description, engineering_done, design_done, database_references, links, components
  } = story;

  const issue = story.issue.toString();

  return (
    <TableRow 
      onMouseEnter={() => setShowEditIcon(true)}
      onMouseLeave={() => setShowEditIcon(false)}
      key={story._id}
    >
      {
        session?.user &&

        <TableCell 
          sx={{ 
            width: "4rem",
            borderBottom: "none",
            padding: "0"
          }}
        >
          {showEditIcon &&
            <Button
              onClick={()=>setShowUserStoryDialog(true)}
            >
              <EditIcon
                color="primary"
              />
            </Button>
          }
          <UserStoryDialog
            issueId={story.issue.toString()}
            prop_id={story._id}
            prop_story={{
              issue, engineering_done, design_done, database_references, links, components,
              description: structuredClone(description)
            }}
            open={showUserStoryDialog}
            handleClose={() => setShowUserStoryDialog(false)}
            onClose={() => setShowUserStoryDialog(false)}
          />
        </TableCell>
      }

      <TableCell sx={{ borderBottom: "none" }}>
        <span>{joinedDescription}</span>
      </TableCell>
      <TableCell
        sx={{
          width: "10rem",
          borderBottom: "none",
          textAlign: "center"
        }}
      >
        <IssueCheckbox 
          checked={design_done}
          saveFunction={async (newValue) => {
            await saveUserStory(story._id, {design_done: newValue}, setIssue)
          }}
        />
      </TableCell>
      <TableCell
        sx={{
          width: "10rem",
          borderBottom: "none",
          textAlign: "center"
        }}
      >
        <IssueCheckbox 
          checked={engineering_done}
          saveFunction={async (newValue) => {
            await saveUserStory(story._id, {engineering_done: newValue}, setIssue)
          }}
        />
      </TableCell>
    </TableRow>
  )
}