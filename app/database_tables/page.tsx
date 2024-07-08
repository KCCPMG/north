import Paper from "@mui/material/Paper";
import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Typography from '@mui/joy/Typography';
import { getPopulatedTables, PopulatedTableType } from "@/models/Controls";
import { Table, TableHead, TableRow, TableCell, TableBody, Box, useTheme } from "@mui/material";
import DBTableAccordion from "@/components/DBTableAccordion";


export default async function Page() {

  const tables: PopulatedTableType[] = await getPopulatedTables();
  // console.log(JSON.stringify(tables, null, 2));



  return (
    <>
      <h1>Tables</h1>
      <Box >
        {tables.map(table => {
          return <DBTableAccordion 
            // table={table} 
            table_id={table._id.toString()}
            table_name={table.name}
            table_properties={table.table_properties.map(tp => {
              return {
                tp_id: tp._id.toString(),
                tp_field: tp.field,
                tp_field_type: tp.field_type,
                tp_special: tp.special
              }
            })}
          />
        })}
      </Box>
    </>
  )

}