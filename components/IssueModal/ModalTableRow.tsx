import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { ReactNode } from "react";
import EditIcon from '@mui/icons-material/Edit';
import { useState, Dispatch, SetStateAction } from "react";
import { useSession } from "next-auth/react";

type ModalTableRowProps = {
  property: string,
  textValue: string | undefined,
  child?: ReactNode,
  setShowDialog: Dispatch<SetStateAction<boolean>>
}

export default function ModalTableRow(
  { property, textValue, child, setShowDialog }: ModalTableRowProps) {

  const { data: session } = useSession();
  const [showEditIcon, setShowEditIcon] = useState(false);


  return (
    <TableRow
      onMouseEnter={(e) => setShowEditIcon(true)}
      onMouseLeave={(e) => setShowEditIcon(false)}
    >
      {session?.user &&       
        <TableCell
          sx={{
            width: "4rem",
            borderBottom: "none",
            padding: "0"
          }}>
          {showEditIcon &&
            <Button onClick={() => {
              setShowDialog(true);
            }}>
              <EditIcon
                color="primary"
              />
            </Button>
          }
        </TableCell>
      }
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
        <Typography variant="body2">
          {child ? child : textValue}
        </Typography>
      </TableCell>
    </TableRow>
  )
}