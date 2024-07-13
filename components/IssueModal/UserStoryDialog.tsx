"use client";
import { IUserStory } from "@/models/UserStory";
import { Dialog, DialogTitle, DialogContent, Modal } from "@mui/material";
import { useState } from "react";


type EditableUserStory = Omit<IUserStory, "issue"> & { issue: string } 


type UserStoryDialogProps = {
  issueId: string,
  prop_id?: string
  prop_story?: EditableUserStory,
  open: boolean,
  onClose: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void
}


export default function UserStoryDialog(
  {issueId, prop_id, prop_story, open, onClose}: UserStoryDialogProps
) {

  const blah: EditableUserStory = {
    issue: issueId,
    description: [],
    engineering_done: false,
    design_done: false,
    database_references: [],
    links: [],
    components: []
  }

  const [currentStory, setStory] = useState<EditableUserStory>(prop_story || {
    issue: issueId,
    description: [],
    engineering_done: false,
    design_done: false,
    database_references: [],
    links: [],
    components: []
  })

  return (
    <Dialog open={open} onClose={onClose}>
      <>
        <DialogTitle>{prop_id ? "Edit " : "Create "}User Story</DialogTitle>
        <DialogContent>
          {/* <Box /> */}
        </DialogContent>
      </>
    </Dialog>
  )
}