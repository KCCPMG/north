"use client";
import { ParsedPopulatedIssueType } from "@/models/Controls"
import { Button, Typography, Box, Divider, Table, TableHead, TableRow, TableCell, Dialog, DialogTitle, DialogContent, Link } from "@mui/material"
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BlockIcon from '@mui/icons-material/Block';
import ModalTableRow from "./IssueModalTableRow";
import EditIcon from '@mui/icons-material/Edit';
import { useEditIssueContext } from "@/context/EditIssueContext";
import IssueModalMergeChecklist from "./IssueModalMergeChecklist";

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
          {/* <Typography variant="body1" id="issue-dialog-description">
            {issue.description}
          </Typography> */}
          <Table>
            <TableHead>
              <Typography variant="h6">Summary</Typography>
            </TableHead>
            <ModalTableRow
              property="Description:"
              textValue={issue.description}
            />
            <ModalTableRow
              property="Designers:"
              textValue={issue.assigned_designers.map(ad => ad.email).join(", ")}
            />
            <ModalTableRow
              property="Engineers:"
              textValue={issue.assigned_engineers.map(ad => ad.email).join(", ")}
            />
            <ModalTableRow
              property="Route Location:"
              textValue={issue.route_location || ""}
            />
            <ModalTableRow
              property="Design Figma Link"
              textValue={issue.design_figma_link}
              child={issue.design_figma_link &&
                <Link
                  href={issue.design_figma_link}
                >
                  {issue.design_figma_link}
                </Link>
              }
            />
            <ModalTableRow
              property="Eng. GitHub Issue Link"
              textValue={issue.eng_team_gh_issue_link || ""}
              child={issue.eng_team_gh_issue_link &&
                <Link href={issue.eng_team_gh_issue_link} >
                  {issue.eng_team_gh_issue_link}
                </Link>
              }
            />
            <ModalTableRow
              property="Eng. Team Files"
              textValue={issue.eng_team_files.join(", ") || ""}
            />
          </Table>
          <IssueModalMergeChecklist issue={issue} />
          {/* <ModalTableRow 
            property="Design Complete: "
            value={issue.}
          />
          <ModalTableRow 
            property=""
            value={issue.}
          />
          <ModalTableRow 
            property=""
            value={issue.}
          /> */}
        </DialogContent>
      </Box>

    </Dialog>
  )
}
