import { Table, TableHead, TableRow, TableCell, Typography, Checkbox } from "@mui/material";
import { ParsedPopulatedIssueType } from "@/models/Controls"
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BlockIcon from '@mui/icons-material/Block';
import { useEditIssueContext } from "@/context/EditIssueContext";

type IssueModalMergeChecklistProps = {
  issue: ParsedPopulatedIssueType
}


export default function IssueModalMergeChecklist({ issue }: IssueModalMergeChecklistProps) {

  const { editMode } = useEditIssueContext();

  return (
    <Table sx={{ marginTop: 2 }}>
      <TableHead>
        <Typography variant="h6">Merge Checklist</Typography>
      </TableHead>
      <TableRow>
        <TableCell sx={{
          width: "12rem",
          borderBottom: "none"
        }}>
          Design Complete:
        </TableCell>
        <TableCell sx={{ borderBottom: "none" }}>
          {editMode ?
            <Checkbox defaultChecked={issue.design_complete} /> :
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
          {editMode ?
            <Checkbox defaultChecked={issue.eng_implementation_complete} /> :

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
          {editMode ?
            <Checkbox
              defaultChecked={issue.eng_implementation_meets_design.meets_design}
            /> :


            issue.eng_implementation_meets_design.meets_design ?
              <>
                <CheckCircleIcon color="primary" />
                <Typography variant="body2">
                  {issue.eng_implementation_meets_design.approving_designer.email}{" - "}
                  {issue.eng_implementation_meets_design.approval_date.toDateString()}
                </Typography>
              </> :
              <BlockIcon />
          }
        </TableCell>
      </TableRow>
    </Table>
  )
}