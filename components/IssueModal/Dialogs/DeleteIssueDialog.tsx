"use client"
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";
import { useState } from "react";
import { CircularProgress } from "@mui/material";
import { useIssueContext } from "@/context/IssueContext";


type DeleteIssueDialogProps = {
  open: boolean
}


export default function DeleteIssueDialog(
  {open}: DeleteIssueDialogProps
) {

  const { issue } = useIssueContext();

  const [deleting, setDeleting] = useState(false);


  return (
    <Dialog open={open}>
      <DialogTitle>
        Delete Issue
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          Are you sure you wish to delete {issue.issueType}: {issue.name}? This cannot be undone.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button 
          variant="outlined"
        >
          Cancel
        </Button>
        <Button 
          variant="contained"
        >
          Confirm Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
}