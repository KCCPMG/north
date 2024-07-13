import { TableCell, TableHead, TableRow, Table, Typography, TableBody, Checkbox, TextField, Chip, Button } from "@mui/material"
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BlockIcon from '@mui/icons-material/Block';
import { IUserStory } from "@/models/UserStory"
import { useEditIssueContext } from "@/context/EditIssueContext"
import QueryTooltip from "./QueryTooltip";
import { v4 as uuidv4 } from 'uuid';
import EditIcon from '@mui/icons-material/Edit';
import { Dispatch, SetStateAction } from "react";



type UserStoryProps = {
  story: IUserStory & {_id: string}
  showUserStoryDialog: boolean,
  setShowUserStoryDialog: Dispatch<SetStateAction<boolean>>
}

export default function UserStory({story}: UserStoryProps) {

  const { editMode } = useEditIssueContext();

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



  return (
    <TableRow key={story._id}>
        {
          editMode && 

          <TableCell sx={{borderBottom: "none"}}>
            <Button>
              <EditIcon 
                color="primary"
              />
            </Button>
          </TableCell>
          // <TextField
          //   defaultValue={story.description.map(des => des.text).join("")}
          //   variant="standard"
          //   multiline
          //   fullWidth
          //   maxRows={2}
          // /> :
            

          
        }

      <TableCell sx={{borderBottom: "none"}}>
        <span>{joinedDescription}</span>
      </TableCell>
      <TableCell 
         sx={{
          width: "10rem",
          borderBottom: "none",
          textAlign: "center"
        }}
      >
        {editMode ?
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
        {editMode ?
          <Checkbox defaultChecked={story.engineering_done} /> :

          story.engineering_done ? 
            <CheckCircleIcon /> : 
            <BlockIcon />
        }
      </TableCell>
    </TableRow>
  )
}