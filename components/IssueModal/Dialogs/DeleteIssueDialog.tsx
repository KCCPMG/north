"use client"
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography"; 
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";
import { useIssueContext } from "@/context/IssueContext";


export default function DeleteIssueDialog() {

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
          Are you sure you wish to delete &quot;{issue.issueType.slice(0,1).toUpperCase()}{issue.issueType.slice(1)}: {issue.name}&quot;? This cannot be undone.
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