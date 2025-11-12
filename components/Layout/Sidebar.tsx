import Drawer from "@mui/material/Drawer"; 
import List from "@mui/material/List"; 
import ListItem from "@mui/material/ListItem"; 
import ListItemText from "@mui/material/ListItemText"; 
import Toolbar from "@mui/material/Toolbar"; 
import Link from "@mui/material/Link";


export default function Sidebar({ width }: { width: string }) {
  return (
    <Drawer
      anchor="left"
      open={true}
      variant="persistent"
      sx={{
        width: width
      }}
      PaperProps={{ sx: { backgroundColor: "#3023b8" } }}
    >
      <Toolbar />
      <List>
        <ListItem>
          <Link href="/issues">
            <ListItemText sx={{ color: "#fff" }} primary="Issues" />
          </Link>
        </ListItem>
      </List>
      <ListItem>
        <Link href="/database_tables">
          <ListItemText sx={{ color: "#fff" }} primary="Database Tables" />
        </Link>
      </ListItem>
    </Drawer>

  )
}