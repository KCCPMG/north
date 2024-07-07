import { Drawer } from "@mui/material";

export default function Sidebar() {
  return (
    <Drawer 
      anchor="left"
      // classes={}
      open={true}
      variant="permanent"
    >
      Hello  
    </Drawer>

  )
}