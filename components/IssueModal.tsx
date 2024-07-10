import { ParsedPopulatedIssueType } from "@/models/Controls"
import { Modal, Typography, Box, Divider, Table, TableRow, TableCell, Dialog, DialogTitle, DialogContent, Link } from "@mui/material"
import ModalTableRow from "./ModalTableRow";

type IssueModalProps = {
  issue: ParsedPopulatedIssueType,
  open: boolean,
  onClose: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void
}

export default function IssueModal({ issue, open, onClose }: IssueModalProps) {

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="lg"
      aria-labelledby="issue-dialog-title"
      aria-describedby="issue-dialog-description"
    >
      <Box>
        <DialogTitle id="issue-dialog-title">
          {issue.issueType[0].toUpperCase()}{issue.issueType.slice(1)}: {issue.name}
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Typography variant="body1" id="issue-dialog-description">
            {issue.description}
            </Typography>
          <Table>
            <ModalTableRow 
              firstText="Designers:" 
              secondText={issue.assigned_designers.map(ad => ad.email).join(", ")}
            />
            <ModalTableRow 
              firstText="Engineers:"
              secondText={issue.assigned_engineers.map(ad => ad.email).join(", ")}
            />
            <ModalTableRow 
              firstText="Route Location:"
              secondText={issue.route_location || ""}
            />
            <ModalTableRow 
              firstText="Design Figma Link"
              secondText={issue.design_figma_link && 
                <Link
                  href={issue.design_figma_link}
                >
                  {issue.design_figma_link}
                </Link>
              }
            />
            <ModalTableRow 
              firstText="Eng. GitHub Issue Link"
              secondText={issue.eng_team_gh_issue_link || ""}
            />
            <ModalTableRow 
              firstText="Eng. Team Files"
              secondText={issue.eng_team_files.join(", ") || ""}
            />
          </Table>
          <Typography variant="h6">Merge Checklist</Typography>
          {/* <ModalTableRow 
            firstText="Design Complete: "
            secondText={issue.}
          />
          <ModalTableRow 
            firstText=""
            secondText={issue.}
          />
          <ModalTableRow 
            firstText=""
            secondText={issue.}
          /> */}
        </DialogContent>
      </Box>

    </Dialog>
  )
}


const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "70%",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


// export  function Blah({ issue, open, onClose: handleClose }: IssueModalProps) {
//   return (
//     <Modal
//       open={open}
//       onClose={handleClose}
//       aria-labelledby="modal-modal-title"
//       aria-describedby="modal-modal-description"
//     >
//       <Box sx={style}>
//         <Typography id="modal-modal-title" variant="h6" component="h2">
//           Text in a modal
//         </Typography>
//         <Typography id="modal-modal-description" sx={{ mt: 2 }}>
//           Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
//         </Typography>
//       </Box>
//     </Modal>
//   )
// }