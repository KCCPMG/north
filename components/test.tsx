"use client";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material";

export default function ItDoesntMatterWhatYourNameIs() {
  const theme = useTheme();

  return (
    <>
      <h1>IT DOESN'T MATTER WHAT YOUR NAME IS</h1>
      <Typography variant="h1">
        IT DOESN'T MATTER WHAT YOUR NAME IS
      </Typography>
      <Typography variant="h2">
        Palette
      </Typography>

      <Typography variant="h6">Primary</Typography>
      <Box display="flex">
        <Box sx={{height: 70, width: 70, backgroundColor: theme.palette.primary.main}}>
          <Typography>main</Typography>
        </Box>
        <Box sx={{height: 70, width: 70, backgroundColor: theme.palette.primary.light}}>
          <Typography>light</Typography>
        </Box>
        <Box sx={{height: 70, width: 70, backgroundColor: theme.palette.primary.dark}}>
          <Typography>dark</Typography>
        </Box>
      </Box>

      <Typography variant="h6">Error</Typography>
      <Box display="flex">
        <Box sx={{height: 70, width: 70, backgroundColor: theme.palette.error.main}}>
          <Typography>main</Typography>
        </Box>
      </Box>

      <Typography variant="h6">Warning</Typography>
      <Box display="flex">
        <Box sx={{height: 70, width: 70, backgroundColor: theme.palette.warning.main}}>
          <Typography>main</Typography>
        </Box>
        <Box sx={{height: 70, width: 70, backgroundColor: theme.palette.warning.light}}>
          <Typography>light</Typography>
        </Box>
        <Box sx={{height: 70, width: 70, backgroundColor: theme.palette.warning.dark}}>
          <Typography>dark</Typography>
        </Box>
      </Box>

      <Typography variant="h6">Success</Typography>
      <Box display="flex">
        <Box sx={{height: 70, width: 70, backgroundColor: theme.palette.success.main}}>
          <Typography>main</Typography>
        </Box>
        <Box sx={{height: 70, width: 70, backgroundColor: theme.palette.success.light}}>
          <Typography>light</Typography>
        </Box>
        <Box sx={{height: 70, width: 70, backgroundColor: theme.palette.success.dark}}>
          <Typography>dark</Typography>
        </Box>
      </Box>
    </>
  )
}