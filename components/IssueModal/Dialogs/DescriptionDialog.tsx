import { TextField } from "@mui/material";
import BaseDialog from "./BaseDialog";
import { useIssueContext } from "@/context/IssueContext";
import { useState } from "react";

export default function DescriptionDialog() {

  const { 
    issue,
    descriptionModalOpen, 
    setDescriptionModalOpen,
    // pendingDescriptionText,
    // setPendingDescriptionText
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
        console.log("placeholder");
      }}
      content={
        <TextField
          value={pendingDescriptionText}
          onChange={(e) => setPendingDescriptionText(e.target.value)}
        />
      }
    />
  )

}