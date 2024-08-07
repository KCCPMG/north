"use client";
import { Card, CardActions, CardContent, Typography, Button, Divider } from "@mui/material"
import { ParsedPopulatedIssueType } from "@/models/Controls";
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import IssueModal from "./IssueModal/IssueModal";
import { useState, useEffect } from "react";
import { useIssueContext } from "@/context/IssueContext";

type IssueCardProps = {
  initialIssue: ParsedPopulatedIssueType
}

export default function IssueCard({ initialIssue }: IssueCardProps) {

  const [modalOpen, setModalOpen] = useState(false);
  // const [issue, setIssue] = useState<ParsedPopulatedIssueType>(initialIssue);
  const { issue, setIssue, updateIssue } = useIssueContext();

  // refresh issue on close
  useEffect(() => {
    if (!modalOpen) updateIssue(issue._id, issue);
  }, [modalOpen])

  async function refresh() {
    try {
      const response = await fetch(`/api/issues/${issue._id}`)
      const json = await response.json();
      console.log(json);
      setIssue(json);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h5">
          {issue.issueType[0].toUpperCase()}{issue.issueType.slice(1)}: {issue.name}
        </Typography>
        <Divider />
        <Typography variant="body1">
          {issue.description}
        </Typography>
        <Typography variant="body2">
          Designers: {issue.assigned_designers.map(ad => ad.email).join(", ")}
        </Typography>
        <Typography variant="body2">
          Engineers: {issue.assigned_engineers.map(ad => ad.email).join(", ")}
        </Typography>
        <CardActions>
          <Button onClick={() => setModalOpen(true)} sx={{ "marginX": "auto" }}>
            <OpenInFullIcon />
          </Button>
          <IssueModal
            refresh={refresh}
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            handleClose={() => setModalOpen(false)}
          />
        </CardActions>
      </CardContent>
    </Card>
  )
}