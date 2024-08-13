import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography"; 
import BlockIcon from '@mui/icons-material/Block';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { ParsedPopulatedIssueType } from "@/models/Controls"
import IssueCheckbox from "./IssueCheckbox";
import { useIssueContext } from "@/context/IssueContext";
import { useSession } from "next-auth/react";
import { saveIssue } from "@/lib/api";

type IssueModalMergeChecklistProps = {
  issue: ParsedPopulatedIssueType
}

export default function IssueModalMergeChecklist({ issue }: IssueModalMergeChecklistProps) {

  const { setIssue } = useIssueContext();
  const { data: session } = useSession();

  return (
    <>
      <Typography variant="h6">Merge Checklist</Typography>
      <Table sx={{ marginTop: 2 }}>
        <TableBody>
          <TableRow>
            <TableCell sx={{
              width: "12rem",
              borderBottom: "none"
            }}>
              Design Complete:
            </TableCell>
            <TableCell sx={{ borderBottom: "none" }}>
              {session?.user ?
                <IssueCheckbox 
                  checked={issue.design_complete}
                  saveFunction={async () => {
                    await saveIssue(issue._id, {
                      design_complete: !issue.design_complete
                    }, setIssue);
                  }}
                /> :
                issue.design_complete ?
                  <CheckCircleIcon color="primary" /> :
                  <BlockIcon />
              }
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{
              width: "12rem",
              borderBottom: "none"
            }}>
              Engineering Complete:
            </TableCell>
            <TableCell sx={{ borderBottom: "none" }}>
              {session?.user ?
                <IssueCheckbox 
                  checked={issue.eng_implementation_complete}
                  saveFunction={async () => {
                    await saveIssue(issue._id, {
                      eng_implementation_complete: !issue.eng_implementation_complete
                    }, setIssue);
                  }}
                /> :
                issue.eng_implementation_complete ?
                  <CheckCircleIcon color="primary" /> :
                  <BlockIcon />
              }
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{
              width: "12rem",
              borderBottom: "none"
            }}>
              Engineering Meets Design:
            </TableCell>
            <TableCell sx={{ borderBottom: "none" }}>
              {session?.user ?
                <IssueCheckbox 
                  checked={issue.eng_implementation_meets_design.meets_design}
                  saveFunction={async () => {
                    await saveIssue(issue._id, {
                      eng_implementation_meets_design: {
                        approval_date: issue.eng_implementation_meets_design.approval_date,
                        meets_design: !issue.eng_implementation_meets_design.meets_design
                      }
                    }, setIssue);
                  }}
                /> :
                issue.eng_implementation_meets_design.meets_design ?
                  <>
                    <CheckCircleIcon color="primary" />
                    <Typography variant="body2">
                      {issue.eng_implementation_meets_design.approving_designer?.email}
                      {
                        issue.eng_implementation_meets_design.approving_designer?.email && 
                        issue.eng_implementation_meets_design.approval_date &&
                        " - "
                      }
                      {issue.eng_implementation_meets_design.approval_date?.toDateString()}
                    </Typography>
                  </> :
                  <BlockIcon />
              }
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  )
}