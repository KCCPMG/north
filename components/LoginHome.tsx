"use client";
import { signIn, getProviders, ClientSafeProvider, LiteralUnion } from "next-auth/react";
import { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";



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
    <>
      {providers && Object.values(providers).map(provider => {
        return (
          <Box key={provider.name}>
            <Button onClick={() => signIn(provider.id)}>
              Sign in with {provider.name}
            </Button>
          </Box>
        )
      })}
    
    </>
  )
}