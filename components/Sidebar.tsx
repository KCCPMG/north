import theme from "@/theme";
import { Drawer, List, ListItem, ListItemText, Toolbar, Link } from "@mui/material";


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
      PaperProps={{sx: {backgroundColor: "#3023b8"}}}
    >
      <Toolbar />
      <List>
        <ListItem>
          <Link href="/database_tables">
            <ListItemText sx={{color: "#fff"}} primary="Database Tables" />
          </Link>
        </ListItem>
        <ListItem>
          <Link href="/issues">
            <ListItemText sx={{color: "#fff"}} primary="Issues" />
          </Link>
        </ListItem>
      </List>
    </Drawer>

  )
}