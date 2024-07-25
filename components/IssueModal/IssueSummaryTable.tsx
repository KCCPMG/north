import { Typography, Table, TableBody, Link } from "@mui/material";
import ModalTableRow from "./ModalTableRow";
import { IUser } from "@/models/User";
import { useIssueContext } from "@/context/IssueContext";
import DescriptionDialog from "./Dialogs/DescriptionDialog";
import DesignersDialog from "./Dialogs/DesignersDialog";
import EngineersDialog from "./Dialogs/EngineersDialog";
import RouteLocationDialog from "./Dialogs/RouteLocationDialog";
import FigmaLinkDialog from "./Dialogs/FigmaLinkDialog";



export default function IssueSummary() {

  const { 
    issue, 
    setDescriptionDialogOpen,
    setDesignersDialogOpen,
    setEngineersDialogOpen,
    setRouteLocationDialogOpen,
    setFigmaLinkDialogOpen,
    setGithubLinkDialogOpen,
    setEngFilesDialogOpen
  } = useIssueContext();

  return (
    <>
      <Typography variant="h6">Summary</Typography>
      <Table>
        <TableBody>
          <ModalTableRow
            property="Description:"
            textValue={issue.description}
            setShowDialog={setDescriptionDialogOpen}
          />
          <ModalTableRow
            property="Designers:"
            textValue={issue.assigned_designers.map(ad => ad.email).join(", ")}
            setShowDialog={setDesignersDialogOpen}
          />
          <ModalTableRow
            property="Engineers:"
            textValue={issue.assigned_engineers.map(ad => ad.email).join(", ")}
            setShowDialog={setEngineersDialogOpen}
          />
          <ModalTableRow
            property="Route Location:"
            textValue={issue.route_location}
            setShowDialog={setRouteLocationDialogOpen}
            child={issue.route_location &&
              <Link
                href={issue.route_location}
              >
                {issue.route_location}
              </Link>
            }
          />
          <ModalTableRow
            property="Design Figma Link"
            textValue={issue.design_figma_link}
            setShowDialog={setFigmaLinkDialogOpen}
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
            textValue={issue.eng_team_gh_issue_link}
            setShowDialog={setEngFilesDialogOpen}
            child={issue.eng_team_gh_issue_link &&
              <Link href={issue.eng_team_gh_issue_link} >
                {issue.eng_team_gh_issue_link}
              </Link>
            }
          />
          <ModalTableRow
            property="Eng. Team Files"
            textValue={issue.eng_team_files.join(", ") || ""}
            setShowDialog={setEngFilesDialogOpen}
          />
        </TableBody>
      </Table>
      {/* dialogs */}
      <DescriptionDialog />
      <DesignersDialog />
      <EngineersDialog />
      <RouteLocationDialog />
      <FigmaLinkDialog />
    </>
  )
}