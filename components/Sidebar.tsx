import { Drawer, List, ListItem, ListItemText, Toolbar } from "@mui/material";
import Link from "next/link";

export default function Sidebar({width}: {width: string}) {
  return (
    <Drawer 
      anchor="left"
      // classes={}
      open={true}
      variant="persistent"
      sx={{
        width: width
      }}
    >
      <Toolbar />
      <List>
        <ListItem>
          <Link href="/database_tables">
            <ListItemText primary="Database Tables" />
          </Link>
        </ListItem>
        <ListItem>
          <Link href="/issues">
            <ListItemText primary="Issues" />
          </Link>
        </ListItem>
      </List>
    </Drawer>

  )
}