import { Paper } from "@mui/material";
import Typography from '@mui/joy/Typography';
import { getPopulatedTables, PopulatedTableType } from "@/models/Controls";


export default async function Page() {

  const tables: PopulatedTableType[] = await getPopulatedTables();
  // console.log(JSON.stringify(tables, null, 2));

  return (
    <>
      <h1>Tables</h1>
      {/* {tables.map(table => {
        return (
          <Paper elevation={4} key={table._id.toString()}>
            <Typography level="h2">
              {table.name}
            </Typography>
            {
              table.table_properties.map(tp => {
                return (
                  <p key={tp._id.toString()}>
                    <span>{tp.field}</span>
                    <span>{tp.field_type}</span>
                    <span>{tp.special}</span>
                  </p>
                )
              })
            }

          </Paper>
        )
      })} */}
    </>
  )

}