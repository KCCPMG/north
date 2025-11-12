import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientSessionProvider from "@/context/ClientSessionProvider";
import mongooseConnect from "@/lib/mongooseConnect";
import Sidebar from "@/components/Layout/Sidebar";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import theme from "@/theme";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import TopBar from "@/components/Layout/TopBar"
import { Box, CssBaseline, Toolbar } from "@mui/material";

const inter = Inter({ subsets: ["latin"] });
const drawerWidth="200px";

export const metadata: Metadata = {
  title: "North",
  description: "A Project Management Tool for Compass",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  await mongooseConnect();

  return (
    <html lang="en">
      <ClientSessionProvider>
        <body className={inter.className}>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Box display="flex">
                <TopBar />
                <Sidebar width={drawerWidth} />
                <Box width={"100%"} sx={{margin: 4}} component="main">
                  <Toolbar />
                  {children}
                </Box>
              </Box>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </body>
      </ClientSessionProvider>
    </html>
  );
}
