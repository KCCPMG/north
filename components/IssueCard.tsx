import { Card, CardActions, CardContent, Typography, Button } from "@mui/material"
import { ParsedPopulatedIssueType } from "@/models/Controls";
import OpenInFullIcon from '@mui/icons-material/OpenInFull';

type IssueCardProps = {
  issue: ParsedPopulatedIssueType
}

export default function IssueCard({ issue }: IssueCardProps) {

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h5">
          {issue.issueType[0].toUpperCase()}{issue.issueType.slice(1)}: {issue.name}
        </Typography>
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
          <Button sx={{"marginX": "auto"}}>
            <OpenInFullIcon />
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  )
}