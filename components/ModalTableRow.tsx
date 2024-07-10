import { Typography, TableRow, TableCell } from "@mui/material";
import { ReactNode } from "react";

type ModalTableRowProps = {
  property: string,
  value: string | undefined | ReactNode
}

export default function ModalTableRow({property, value}: ModalTableRowProps) {
  return (
    <TableRow>
      <TableCell>
        <Typography variant="body2">
          {property}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body2">
          {value}
        </Typography>
      </TableCell>
    </TableRow>
  )
}