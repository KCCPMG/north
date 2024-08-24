"use client"
import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import KeyboardArrowUpDown from '@mui/icons-material/KeyboardArrowDown';
import Typography from '@mui/joy/Typography';
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";


type DBTableAccordionProps = {
  table_name: string,
  table_properties: {
    tp_id: string,
    tp_field: string,
    tp_field_type: "Unique ID" | "Timestamp" | "Text" | "Integer" | "True/False" | "Date",
    tp_special: string | undefined
  }[]
}


export default function DBTableAccordion({table_name, table_properties}: DBTableAccordionProps ) {

  return (
    <Accordion>
      <AccordionSummary expandIcon={<KeyboardArrowUpDown/>}>
        <Typography level="h2">
          {table_name}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Field</TableCell>
              <TableCell>Field Type</TableCell>
              <TableCell>Special</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {table_properties.map(tp => {
              return (
                <TableRow key={tp.tp_id}>
                  <TableCell>{tp.tp_field}</TableCell>
                  <TableCell>{tp.tp_field_type}</TableCell>
                  <TableCell>{tp.tp_special}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </AccordionDetails>
    </Accordion>
  )

}