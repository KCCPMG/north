import { useIssueContext } from "@/context/IssueContext";
import { Button, Typography, TableRow, TableCell, TextField, useTheme } from "@mui/material";
import { ChangeEvent, ReactNode } from "react";
import EditIcon from '@mui/icons-material/Edit';
import { useState, Dispatch, SetStateAction } from "react";

type ModalTableRowProps = {
  property: string,
  textValue: string | undefined,
  // onChange: (e: ChangeEvent) => React.SetStateAction<string>,
  child?: ReactNode,
  // showDialog: (e: MouseEventHandler<HTMLAnchorElement>) => SetStateAction<boolean>
  setShowDialog: Dispatch<SetStateAction<boolean>>
}

export default function ModalTableRow(
  { property, textValue, child, setShowDialog }: ModalTableRowProps) 
{

  const { editMode } = useIssueContext();

  const theme = useTheme();

  const [showEditIcon, setShowEditIcon] = useState(false);


  return (
    <TableRow 
      onMouseEnter={(e) => setShowEditIcon(true)}
      onMouseLeave={(e) => setShowEditIcon(false)}  
    >
      <TableCell sx={{
          width: "4rem",
          borderBottom: "none",
          padding: "0"
        }}>
        {showEditIcon &&
          <Button onClick={()=>{
            setShowDialog(true);
          }}>

            <EditIcon 
              color="primary"
            />
          </Button> 
        }
      </TableCell>
      <TableCell
        sx={{
          width: "12rem",
          borderBottom: "none"
        }}
      >
        <Typography variant="body2">
          {property}
        </Typography>
      </TableCell>
      <TableCell sx={{ borderBottom: "none" }}>
        {editMode ?
          <TextField
            defaultValue={textValue}
            variant="standard"
            // onChange={(e)=>}
            multiline
            fullWidth
            maxRows={2}
          /> :
          <Typography variant="body2">
            {child ? child : textValue}
          </Typography>
        }
      </TableCell>
    </TableRow>
  )
}