"use client";
import { ParsedPopulatedIssueType } from "@/models/Controls"
import { Button, Typography, Box, Divider, Table, TableBody, Dialog, DialogTitle, DialogContent, Link, Stack } from "@mui/material"
import ModalTableRow from "./TableRow";
import EditIcon from '@mui/icons-material/Edit';
import { useEditIssueContext } from "@/context/EditIssueContext";
import IssueModalMergeChecklist from "./MergeChecklist";
import UserStories from "./UserStories";
import IssueSummary from "./IssueSummary";

type IssueModalProps = {
  issue: ParsedPopulatedIssueType,
  open: boolean,
  onClose: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void
}

export default function IssueModal({ issue, open, onClose }: IssueModalProps) {

  const { editMode, setEditMode } = useEditIssueContext();

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
      <Box>
        <DialogTitle id="issue-dialog-title">
          {issue.issueType[0].toUpperCase()}{issue.issueType.slice(1)}: {issue.name}
          {!editMode &&
            <Button>
              <EditIcon onClick={() => setEditMode(true)} color="primary" />
            </Button>
          }
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Stack 
            direction="column" 
            spacing={5}
            divider={<Divider orientation="horizontal" />}
          >
            <Box>
              <IssueSummary
                description={issue.description}
                assigned_designers={issue.assigned_designers}
                assigned_engineers={issue.assigned_engineers} 
                route_location={issue.route_location}
                design_figma_link={issue.design_figma_link}
                eng_team_gh_issue_link={issue.eng_team_gh_issue_link}
                eng_team_files={issue.eng_team_files}
              />
            </Box>
            <Box>
              <UserStories issueId={issue._id} stories={issue.user_stories} />
            </Box>
            <Box>
              <IssueModalMergeChecklist issue={issue} />
            </Box>
          </Stack>
        </DialogContent>
      </Box>
    </Dialog >
  )
}
