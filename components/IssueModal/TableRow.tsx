import { useEditIssueContext } from "@/context/EditIssueContext";
import { Typography, TableRow, TableCell, TextField } from "@mui/material";
import { ReactNode } from "react";

type ModalTableRowProps = {
  property: string,
  textValue: string | undefined,
  child?: ReactNode
}

export default function ModalTableRow({ property, textValue, child }: ModalTableRowProps) {

  const { editMode } = useEditIssueContext();


  return (
    <TableRow>
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