import { Typography, TableRow, TableCell } from "@mui/material";
import { ReactNode } from "react";

type ModalTableRowProps = {
  firstText: string,
  secondText: string | undefined | ReactNode
}

export default function ModalTableRow({firstText, secondText}: ModalTableRowProps) {
  return (
    <TableRow>
      <TableCell>
        <Typography variant="body2">
          {firstText}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body2">
          {secondText}
        </Typography>
      </TableCell>
    </TableRow>
  )
}