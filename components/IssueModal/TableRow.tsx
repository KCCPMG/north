import { useIssueContext } from "@/context/IssueContext";
import { Typography, TableRow, TableCell, TextField } from "@mui/material";
import { ChangeEvent, ReactNode } from "react";

type ModalTableRowProps = {
  property: string,
  textValue: string | undefined,
  // onChange: (e: ChangeEvent) => React.SetStateAction<string>,
  child?: ReactNode
}

export default function ModalTableRow(
  { property, textValue, child }: ModalTableRowProps) 
{

  const { editMode } = useIssueContext();


  return (
    <TableRow>
      <TableCell>
        
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