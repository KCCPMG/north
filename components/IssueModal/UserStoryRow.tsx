"use client";
import { TableCell, TableHead, TableRow, Table, Typography, TableBody, Checkbox, TextField, Chip, Button } from "@mui/material"
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BlockIcon from '@mui/icons-material/Block';
import { IUserStory } from "@/models/UserStory"
import { useIssueContext } from "@/context/IssueContext"
import QueryTooltip from "./QueryTooltip";
import { v4 as uuidv4 } from 'uuid';
import EditIcon from '@mui/icons-material/Edit';
import { Dispatch, SetStateAction, useState } from "react";
import UserStoryDialog, { EditableUserStory } from "./Dialogs/UserStoryDialog";
import Issue from "@/models/Issue";
import { useSession } from "next-auth/react";



type UserStoryProps = {
  story: IUserStory & { _id: string }
  showUserStoryDialog: boolean,
  setShowUserStoryDialog: Dispatch<SetStateAction<boolean>>,
  refresh: () => void
}

export default function UserStory({ story, refresh }: UserStoryProps) {

  const { editMode } = useIssueContext();
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

  // const assembledStory = <span>
  //   {description.join("")}
  // </span>


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
            // prop_story={structuredClone(story) as EditableUserStory}
            open={showUserStoryDialog}
            handleClose={() => setShowUserStoryDialog(false)}
            onClose={() => setShowUserStoryDialog(false)}
            // refresh={refresh}
          />
        </TableCell>
        // <TextField
        //   defaultValue={story.description.map(des => des.text).join("")}
        //   variant="standard"
        //   multiline
        //   fullWidth
        //   maxRows={2}
        // /> :



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
        {session?.user ?
          <Checkbox defaultChecked={story.design_done} /> :

          story.design_done ?
            <CheckCircleIcon /> :
            <BlockIcon />
        }
      </TableCell>
      <TableCell
        sx={{
          width: "10rem",
          borderBottom: "none",
          textAlign: "center"
        }}
      >
        {session?.user ?
          <Checkbox defaultChecked={story.engineering_done} /> :

          story.engineering_done ?
            <CheckCircleIcon /> :
            <BlockIcon />
        }
      </TableCell>
    </TableRow>
  )
}