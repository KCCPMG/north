import { TableCell, TableHead, TableRow, Table, Typography, TableBody, Checkbox, TextField } from "@mui/material"
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BlockIcon from '@mui/icons-material/Block';
import { IUserStory } from "@/models/UserStory"
import { useEditIssueContext } from "@/context/EditIssueContext"


type UserStoryProps = {
  story: IUserStory & {_id: string}
}

export default function UserStory({story}: UserStoryProps) {

  const { editMode } = useEditIssueContext();

  return (
    <TableRow>
      <TableCell sx={{borderBottom: "none"}}>
        {
          editMode ? 
          <TextField
            defaultValue={story.description.map(des => des.text).join("")}
            variant="standard"
            multiline
            fullWidth
            maxRows={2}
          /> :

          story.description.map(des => <span>{des.text}</span>) 
      
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