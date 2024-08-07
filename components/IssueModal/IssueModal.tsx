"use client";
import { ParsedPopulatedIssueType } from "@/models/Controls"
import { Button, Typography, Box, Divider, Table, TableBody, Dialog, DialogTitle, DialogContent, Link, Stack, DialogActions, CircularProgress, useTheme } from "@mui/material"
import ModalTableRow from "./ModalTableRow";
import EditIcon from '@mui/icons-material/Edit';
import { useIssueContext } from "@/context/IssueContext";
import IssueModalMergeChecklist from "./MergeChecklistTable";
import UserStoriesTable from "./UserStoriesTable";
import IssueSummaryTable from "./IssueSummaryTable";
import { useState } from "react";
import IssueHeaderDialog from "./Dialogs/IssueHeaderDialog";
import { useSession } from "next-auth/react";
import DeleteIssueDialog from "./Dialogs/DeleteIssueDialog";

type IssueModalProps = {
  refresh: () => void,
  open: boolean,
  onClose: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void,
  handleClose: () => void
}

export default function IssueModal({ open, onClose, refresh, handleClose }: IssueModalProps) {

  const { 
    editMode, setEditMode, issue, setIssue, setIssueHeaderDialogOpen, setDeleteIssueDialogOpen
  } = useIssueContext();

  const theme = useTheme();
  const { data: session } = useSession();

  const [saving, setSaving] = useState(false);
  const [saveErrorMessageVisible, setSaveErrorMessageVisible] = useState(false);
  const [showDialogTitleButton, setShowDialogTitleButton] = useState(false);

  return (
    <Dialog
      open={open}
      onClose={(event, reason) => {
        setEditMode(false);
        onClose(event, reason);
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
            color="error"
            variant="outlined"
            onClick={() => {setDeleteIssueDialogOpen(true)}}
          >
            Delete Issue
          </Button>
        </DialogActions>

      }
      {/* {editMode &&

        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => {
              setEditMode(false);
              setSaving(false);
              // handleClose();
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={async () => {
              try {
                setSaving(true);
                setSaveErrorMessageVisible(false);
                const response = await fetch(`/api/issues/${issue._id}`, {
                  method: 'post',
                  body: JSON.stringify(issue)
                })
                const json = await response.json();

                setIssue(json);
                setSaving(false);
                setSaveErrorMessageVisible(false);

              } catch (err) {
                console.log(err);
                setSaving(false);
                setSaveErrorMessageVisible(true);
              }
            }}
          >
            {saving ? <CircularProgress sx={{ color: "white" }} /> : "Save"}
          </Button>
        </DialogActions>
      }
      {editMode && saveErrorMessageVisible &&
        <DialogContent>
          <Typography sx={{ color: theme.palette.error.main }}>
            Something went wrong, please try again.
          </Typography>
        </DialogContent>
      } */}
      {/* </Box> */}
      <DeleteIssueDialog />
    </Dialog >
  )
}
