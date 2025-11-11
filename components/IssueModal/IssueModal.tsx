"use client";
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import Divider from "@mui/material/Divider"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import DialogContent from "@mui/material/DialogContent"
import Stack from "@mui/material/Stack"
import DialogActions from "@mui/material/DialogActions"
import EditIcon from '@mui/icons-material/Edit';
import IssueModalMergeChecklist from "./MergeChecklistTable";
import UserStoriesTable from "./UserStoriesTable";
import IssueSummaryTable from "./IssueSummaryTable";
import IssueHeaderDialog from "./Dialogs/IssueHeaderDialog";
import DeleteIssueDialog from "./Dialogs/DeleteIssueDialog";
import { useState } from "react";
import { useIssueContext } from "@/context/IssueContext";
import { useSession } from "next-auth/react";

type IssueModalProps = {
  refresh: () => void,
  open: boolean,
  handleClose: (event: {}, reason: "backdropClick" | "escapeKeyDown" | "closeButtonClick") => void,
}

export default function IssueModal({ open, refresh, handleClose }: IssueModalProps) {

  const { 
    setEditMode, issue, setIssueHeaderDialogOpen, setDeleteIssueDialogOpen
  } = useIssueContext();

  const { data: session } = useSession();
  const [showDialogTitleButton, setShowDialogTitleButton] = useState(false);

  return (
    <Dialog
      open={open}
      onClose={(event, reason) => {
        setEditMode(false);
        handleClose(event, reason);
      }}
      fullWidth
      maxWidth="md"
      aria-labelledby="issue-dialog-title"
      aria-describedby="issue-dialog-description"
    >
      {/* <Box> */}
      <DialogTitle 
        id="issue-dialog-title"
        sx={{lineHeight: 2}}
        onMouseEnter={() => {setShowDialogTitleButton(true)}}
        onMouseLeave={() => {setShowDialogTitleButton(false)}}
      >
        {issue.issueType[0].toUpperCase()}{issue.issueType.slice(1)}: {issue.name}
        {showDialogTitleButton && session?.user &&       
          <Button>
            <EditIcon onClick={() => setIssueHeaderDialogOpen(true)} color="primary" />
          </Button>
        }
        <IssueHeaderDialog />
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Stack
          direction="column"
          spacing={5}
          divider={<Divider orientation="horizontal" />}
        >
          <Box>
            <IssueSummaryTable/>
          </Box>
          <Box>
            <UserStoriesTable
              issueId={issue._id}
              stories={issue.user_stories}
              refresh={refresh}
            />
          </Box>
          <Box>
            <IssueModalMergeChecklist issue={issue} />
          </Box>
        </Stack>
      </DialogContent>
      {session?.user &&
        <DialogActions>
          <Button
            color="primary"
            variant="contained"
            onClick={(e) => handleClose(e, "closeButtonClick")}
          >
            Close
          </Button>
          <Button 
            color="error"
            variant="outlined"
            onClick={() => {setDeleteIssueDialogOpen(true)}}
          >
            Delete Issue
          </Button>
        </DialogActions>
      }
      <DeleteIssueDialog />
    </Dialog >
  )
}
