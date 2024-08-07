"use client"
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";
import { useState } from "react";
import { CircularProgress } from "@mui/material";
import { useIssueContext } from "@/context/IssueContext";


// type DeleteIssueDialogProps = {
//   open: boolean
// }


export default function DeleteIssueDialog(
  // {open}: DeleteIssueDialogProps
) {

  const { issue, deleteIssueDialogOpen, setDeleteIssueDialogOpen, updateIssue } = useIssueContext();

  const [deleting, setDeleting] = useState(false);
  const [errorMessageVisible, setErrorMessageVisible] = useState(false);


  return (
    <Dialog open={deleteIssueDialogOpen}>
      <DialogTitle>
        Delete Issue
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          Are you sure you wish to delete "{issue.issueType.slice(0,1).toUpperCase()}{issue.issueType.slice(1)}: {issue.name}"? This cannot be undone.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button 
          variant="outlined"
          onClick={() => {
            setErrorMessageVisible(false);
            setDeleteIssueDialogOpen(false);
          }}
        >
          Cancel
        </Button>
        <Button 
          variant="contained"
          onClick={async () => {
            setDeleting(true);
            const response = await fetch(`/api/issues/${issue._id}/delete`, {
              method: 'POST'
            });
            setDeleting(false);
            if (response.status === 204) {
              updateIssue(issue._id)
            } else {
              setErrorMessageVisible(true);
            }
          }}
        >
          {deleting ? <CircularProgress size={25} /> : "Confirm Delete"}
        </Button>
      </DialogActions>
      {errorMessageVisible &&
        <DialogContent>
          <Typography color="error">
            Something went wrong, please try again.
          </Typography>
        </DialogContent>
      }
    </Dialog>
  )
}