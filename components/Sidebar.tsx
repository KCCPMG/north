import { Drawer, List, ListItem, ListItemText, Toolbar } from "@mui/material";

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
          <ListItemText primary="Menu Item 1" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Menu Item 2" />
        </ListItem>
      </List>
    </Drawer>

  )
}