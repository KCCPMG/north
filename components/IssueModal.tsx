"use client";
import { ParsedPopulatedIssueType } from "@/models/Controls"
import { Button, Typography, Box, Divider, Table, TableHead, TableRow, TableCell, Dialog, DialogTitle, DialogContent, Link } from "@mui/material"
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BlockIcon from '@mui/icons-material/Block';
import ModalTableRow from "./ModalTableRow";
import EditIcon from '@mui/icons-material/Edit';
import { useEditIssueContext } from "@/context/EditIssueContext";

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
              <EditIcon onClick={()=>setEditMode(true)} color="primary" />
            </Button>
          }
        </DialogTitle>
        <Divider />
        <DialogContent>
          {/* <Typography variant="body1" id="issue-dialog-description">
            {issue.description}
          </Typography> */}
          <Table>
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
          <Table sx={{marginTop: 1.5}}>
            <TableHead>
              <Typography variant="h6">Merge Checklist</Typography>
            </TableHead>
            <TableRow>
              <TableCell>
                Design Complete:
              </TableCell>
              <TableCell>
                {issue.design_complete ? 
                  <CheckCircleIcon color="primary" /> :
                  <BlockIcon />
                }
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                Engineering Complete:
              </TableCell>
              <TableCell>
                {issue.eng_implementation_complete ? 
                  <CheckCircleIcon color="primary" /> :
                  <BlockIcon />
                }
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                Engineering Meets Design:
              </TableCell>
              <TableCell>
                {issue.eng_implementation_meets_design.meets_design ? 
                  <>
                    <CheckCircleIcon color="primary" /> 
                    <Typography variant="body2">
                      {issue.eng_implementation_meets_design.approving_designer.email}{" - "}
                      {issue.eng_implementation_meets_design.approval_date.toDateString()}
                    </Typography>
                  </>:
                  <BlockIcon />
                }
              </TableCell>
            </TableRow>
          </Table>
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
