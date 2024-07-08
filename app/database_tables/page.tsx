import Paper from "@mui/material/Paper";
import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Typography from '@mui/joy/Typography';
import { getPopulatedTables, PopulatedTableType } from "@/models/Controls";
import { Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";


export default async function Page() {

  const tables: PopulatedTableType[] = await getPopulatedTables();
  // console.log(JSON.stringify(tables, null, 2));

  return (
    <>
      <h1>Tables</h1>
      {tables.map(table => {
        return (
          <Paper elevation={4} key={table._id.toString()}>
            <Accordion>
              <AccordionSummary expandIcon={<KeyboardArrowUpIcon/>}>
                <Typography level="h2">
                  {table.name}
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
                    {table.table_properties.map(tp => {
                      return (
                        <TableRow key={tp._id.toString()}>
                          <TableCell>{tp.field}</TableCell>
                          <TableCell>{tp.field_type}</TableCell>
                          <TableCell>{tp.special}</TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </AccordionDetails>
            </Accordion>
          </Paper>
        )
      })}
    </>
  )

}