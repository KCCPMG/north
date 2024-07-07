import Table, { PopulatedTableType } from "@/models/Table"
import { Paper } from "@mui/material";
import Typography from '@mui/joy/Typography';


export default async function Page() {

  const tables: PopulatedTableType[] = await Table.populateAll();

  await Table.goInsane();

  // console.log(JSON.stringify(tables));

  return (
    <>
      <h1>Tables</h1>
      {tables.map(table => {
        return (
          <Paper elevation={4}>
            <Typography level="h2">
              {table.name}
            </Typography>
            {
              table.table_properties.map(tp => {
                return (
                  <p>
                    <span>{tp.field}</span>
                    <span>{tp.field_type}</span>
                    <span>{tp.special}</span>
                  </p>
                )
              })
            }

          </Paper>
        )
      })}
    </>
  )

}