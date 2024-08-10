"use client";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import BaseDialog from "./BaseDialog";
import { useState } from "react";
import { useIssueContext } from "@/context/IssueContext";

export default function IssueHeaderDialog() {

  const { 
    issueHeaderDialogOpen, setIssueHeaderDialogOpen, issue, setIssue 
  } = useIssueContext();

  const [name, setName] = useState(issue.name);
  const [issueType, setIssueType] = useState(issue.issueType);

  return (
    <BaseDialog 
      title="Issue Type and Title"
      open={issueHeaderDialogOpen}
      handleClose={() => setIssueHeaderDialogOpen(false)}
      handleSave={async () => {
        try {
          const response = await fetch(`api/issues/${issue._id}`, {
            method: 'post',
            body: JSON.stringify({
              name: name,
              issueType: issueType
            })
          })
          if (response.status >= 400) throw new Error("Response Error");
          const json = await response.json();
          setIssue(json);
        } catch(err) {
          console.log(err);
          throw err;
        }
      }}
      content={
        <Stack sx={{paddingTop: 2}} spacing={3}>
          <TextField 
            label="Issue Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Issue Type"
            value={issueType}
            select
            onChange={(e) => setIssueType(e.target.value as "page" | "component")}
          >
            <MenuItem value="page">Page</MenuItem>
            <MenuItem value="component">Component</MenuItem>
          </TextField>
        </Stack>
      }
    />
  )
}