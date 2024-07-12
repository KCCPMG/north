import { IUser } from "@/models/User"
import { Card, CardActions, CardContent, Typography, Button, Divider } from "@mui/material"


type TooltipIssueCardProps = {
  issueType: string,
  name: string,
  description: string,
  assigned_designers: Array<IUser>, 
  assigned_engineers: Array<IUser>
}


export default function TooltipIssueCard(
  {issueType, name, description, assigned_designers, assigned_engineers} : TooltipIssueCardProps
) {

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h5">
          {issueType[0].toUpperCase()}{issueType.slice(1)}:
        </Typography>
        <Divider />
        <Typography variant="body1">
          {description}
        </Typography>
        <Typography variant="body2">
          Designers: {assigned_designers.map(ad => ad.email).join(", ")}
        </Typography>
        <Typography variant="body2">
          Engineers: {assigned_engineers.map(ad => ad.email).join(", ")}
        </Typography>
      </CardContent>
    </Card>
  )

}