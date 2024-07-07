"use client";

import { AppBar, Toolbar, Typography } from "@mui/material";
import theme from "@/theme";



export default function Topbar() {

  return (
    <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Typography variant="h6">
          Top
        </Typography>
      </Toolbar>
    </AppBar>
  )
}