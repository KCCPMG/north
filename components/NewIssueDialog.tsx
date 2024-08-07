"use client";
import { useState } from "react";
import BaseDialog from "./IssueModal/Dialogs/BaseDialog";

import { Stack, MenuItem, Select, TextField } from "@mui/material";
import { ParsedPopulatedIssueType } from "@/models/Controls";


type NewIssueDialogProps = {
  open: boolean,
  handleClose: () => void,
  addIssue: (issue: ParsedPopulatedIssueType) => void

}

export default function NewIssueDialog(
  {open, handleClose, addIssue}: NewIssueDialogProps
) {

  const [name, setName] = useState("");
  const [issueType, setIssueType] = useState("page");
  const [description, setDescription] = useState("");

  return (
    <BaseDialog 
      title="Create New Issue"
      open={open}
      handleClose={handleClose}
      handleSave={async () => {
        try {
          const response = await fetch('api/issues', {
            method: 'post',
            body: JSON.stringify({
              name: name,
              issueType: issueType,
              description: description
            })
          })
          if (response.status >= 400) throw new Error("Response Error");
          const json = await response.json();
          console.log(json);
          addIssue(json);
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
            error={name.length == 0}
            helperText={name.length == 0 && 
              "Please add an issue name."
            }
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
          <TextField 
            label="Description"
            value={description}
            rows={2}
            onChange={(e) => setDescription(e.target.value)}
            error={description.length == 0}
            helperText={description.length == 0 && 
              "Please add an issue description."
            }
          />
        </Stack>
      }
      disabled={!(description.length > 0 && name.length > 0)}
    />
  )
}