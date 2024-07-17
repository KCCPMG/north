import { Typography, Table, TableBody, Link } from "@mui/material";
import ModalTableRow from "./TableRow";
import { IUser } from "@/models/User";


type IssueSummaryProps = {
  description: string,
  assigned_designers: Array<IUser & {
    _id: string
  }>,
  assigned_engineers: Array<IUser & {
    _id: string
  }>,
  route_location: string | undefined,
  design_figma_link: string | undefined,
  eng_team_gh_issue_link: string | undefined,
  eng_team_files: Array<string>
}

export default function IssueSummary(
  {description, assigned_designers, assigned_engineers, route_location, design_figma_link, eng_team_gh_issue_link, eng_team_files}: IssueSummaryProps) {
  return (
    <>
      <Typography variant="h6">Summary</Typography>
      <Table>
        <TableBody>
          <ModalTableRow
            property="Description:"
            textValue={description}
          />
          <ModalTableRow
            property="Designers:"
            textValue={assigned_designers.map(ad => ad.email).join(", ")}
          />
          <ModalTableRow
            property="Engineers:"
            textValue={assigned_engineers.map(ad => ad.email).join(", ")}
          />
          <ModalTableRow
            property="Route Location:"
            textValue={route_location}
          />
          <ModalTableRow
            property="Design Figma Link"
            textValue={design_figma_link}
            child={design_figma_link &&
              <Link
                href={design_figma_link}
              >
                {design_figma_link}
              </Link>
            }
          />
          <ModalTableRow
            property="Eng. GitHub Issue Link"
            textValue={eng_team_gh_issue_link}
            child={eng_team_gh_issue_link &&
              <Link href={eng_team_gh_issue_link} >
                {eng_team_gh_issue_link}
              </Link>
            }
          />
          <ModalTableRow
            property="Eng. Team Files"
            textValue={eng_team_files.join(", ") || ""}
          />
        </TableBody>
      </Table>
    </>
  )
}