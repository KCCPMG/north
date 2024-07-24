import { Typography, Table, TableBody, Link } from "@mui/material";
import TableRow from "./TableRow";
import { IUser } from "@/models/User";
import { useIssueContext } from "@/context/IssueContext";



export default function IssueSummary() {

  const { issue } = useIssueContext();

  return (
    <>
      <Typography variant="h6">Summary</Typography>
      <Table>
        <TableBody>
          <TableRow
            property="Description:"
            textValue={issue.description}
          />
          <TableRow
            property="Designers:"
            textValue={issue.assigned_designers.map(ad => ad.email).join(", ")}
          />
          <TableRow
            property="Engineers:"
            textValue={issue.assigned_engineers.map(ad => ad.email).join(", ")}
          />
          <TableRow
            property="Route Location:"
            textValue={issue.route_location}
          />
          <TableRow
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
          <TableRow
            property="Eng. GitHub Issue Link"
            textValue={issue.eng_team_gh_issue_link}
            child={issue.eng_team_gh_issue_link &&
              <Link href={issue.eng_team_gh_issue_link} >
                {issue.eng_team_gh_issue_link}
              </Link>
            }
          />
          <TableRow
            property="Eng. Team Files"
            textValue={issue.eng_team_files.join(", ") || ""}
          />
        </TableBody>
      </Table>
    </>
  )
}