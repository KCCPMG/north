"use client";

import AppBar from "@mui/material/AppBar"; 
import Toolbar from "@mui/material/Toolbar"; 
import Typography from "@mui/material/Typography"; 
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import theme from "@/theme";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";


export default function TopBar() {

  const { data: session } = useSession();

  return (
    <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Typography variant="h6">
          Top
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Box>
          {session?.user ? 

            <Button onClick={() => signOut()}>
              <Typography variant="h6" color="white" sx={{textTransform: "none"}}>
                Sign Out 
              </Typography>
            </Button>
            :
            <Button onClick={() => signIn()}>
              <Typography variant="h6" color="white" sx={{textTransform: "none"}}>
                Sign In 
              </Typography>
            </Button>
          }

        </Box>
      </Toolbar>
    </AppBar>
  )
}