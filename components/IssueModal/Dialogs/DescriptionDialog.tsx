import TextField from "@mui/material/TextField";
import BaseDialog from "./BaseDialog";
import { useIssueContext } from "@/context/IssueContext";
import { useState, useEffect } from "react";

export default function DescriptionDialog() {

  const { 
    issue,
    setIssue,
    descriptionDialogOpen, 
    setDescriptionDialogOpen,
  } = useIssueContext();


  const [
    pendingDescriptionText,
    setPendingDescriptionText
  ] = useState(issue.description);


  useEffect(() => {
    if (descriptionDialogOpen === true) {
      setPendingDescriptionText(issue.description);
    }
  }, [descriptionDialogOpen])


  return (
    <BaseDialog 
      title="Description"
      open={descriptionDialogOpen}
      handleClose={()=>{
        setDescriptionDialogOpen(false);
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