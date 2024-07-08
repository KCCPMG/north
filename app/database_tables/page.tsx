import Typography from '@mui/joy/Typography';
import { getPopulatedTables, PopulatedTableType } from "@/models/Controls";
import Grid from "@mui/material/Grid";
import DBTableAccordion from "@/components/DBTableAccordion";


export default async function Page() {

  const tables: PopulatedTableType[] = await getPopulatedTables();

  return (
    <>
      <Typography level="h1">Database Tables</Typography>
      <Grid container>
        {tables.map(table => {
          return (
            <Grid item xs={12} sm={12} md={6}>
            <DBTableAccordion 
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
            </Grid>
          )
        })}
      </Grid>
    </>
  )

}