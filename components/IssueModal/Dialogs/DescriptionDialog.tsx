import { TextField } from "@mui/material";
import BaseDialog from "./BaseDialog";
import { useIssueContext } from "@/context/IssueContext";
import { useState } from "react";

export default function DescriptionDialog() {

  const { 
    issue,
    setIssue,
    descriptionModalOpen, 
    setDescriptionModalOpen,
  } = useIssueContext();


  const [pendingDescriptionText,
    setPendingDescriptionText] = useState(issue.description);

  return (
    <BaseDialog 
      title="Description"
      open={descriptionModalOpen}
      handleClose={()=>{
        setPendingDescriptionText(issue.description);
        setDescriptionModalOpen(false);
      }}
      handleSave={async () => {
        try {
          const response = await fetch(`api/issues/${issue._id}`, {
            method: 'post',
            body: JSON.stringify({description: pendingDescriptionText})
          })
          if (response.status >= 400) throw new Error("Response Error");
          const json = await response.json();
          console.log(json);
          setIssue(json);
        } catch(err) {
          console.log(err);
          throw err;
        }
      }}
      content={
        <TextField
          variant="outlined"
          multiline
          maxRows={3}
          fullWidth
          value={pendingDescriptionText}
          onChange={(e) => setPendingDescriptionText(e.target.value)}
        />
      }
    />
  )

}