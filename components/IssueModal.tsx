import { ParsedPopulatedIssueType } from "@/models/Controls"
import { Modal, Typography } from "@mui/material"

type IssueModalProps = {
  issue: ParsedPopulatedIssueType,
  open: boolean,
  onClose: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void
}

export default function IssueModal({ issue, open, onClose }: IssueModalProps) {

  return (
    <Modal open={open} onClose={onClose}>
      <Typography variant="h2">{issue.name}</Typography>

    </Modal>
  )
}