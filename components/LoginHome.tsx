"use client";
import { signIn, getProviders, ClientSafeProvider } from "next-auth/react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "next/link";



export default function LoginHome() {

  const [providers, setProviders] = useState<{ [s: string]: ClientSafeProvider; } | ArrayLike<ClientSafeProvider> | null>(null);

  async function retrieveProviders() {
    const retrievedProviders = await getProviders();
    setProviders(retrievedProviders);
  }

  useEffect(() => {
    retrieveProviders();
  }, [])

  return (
    <Stack
      sx={{
        maxWidth: 650,
        marginX: 'auto',
        marginTop: 10
      }}
      spacing={2}
    >
      <Box sx={{ width: '100%' }} alignItems="left">
        <Typography variant="h1">North</Typography>
        <Typography variant="h2">
          A Project Management Tool for Compass
        </Typography>
      </Box>
      <Stack alignItems="center" spacing={3}>
        <Box>
          <Typography variant="body1">
            Welcome to North! If you would like to be able to edit and create issues, please log in. Doing so will automatically register you as a user, and also allow you to be assigned issues. If you would like to only view without editing, please click the bottom link to be directed to the Issues page as a viewer only.
          </Typography>
        </Box>
        <Box>
          {providers && Object.values(providers).map(provider => {
            return (
              <Box key={provider.name}>
                <Button variant="contained" onClick={() => signIn(provider.id)}>
                  Sign in with {provider.name}
                </Button>
              </Box>
            )
          })}
        </Box>
        <Box>

          <Link href="/issues">Continue without Logging In</Link>
        </Box>
      </Stack>
    </Stack>
  )
}