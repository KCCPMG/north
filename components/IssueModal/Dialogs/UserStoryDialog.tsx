"use client";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Button from "@mui/material/Button";
import TableBody from "@mui/material/TableBody";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
import CircularProgress from '@mui/material/CircularProgress';
import { IUserStory } from "@/models/UserStory";
import { useState, useEffect, ReactNode } from "react";
import { v4 as uuidv4 } from 'uuid';
import QueryTooltip from "../QueryTooltip";
import { AddCircleOutline } from "@mui/icons-material";
import { useIssueContext } from "@/context/IssueContext";
import { useTheme } from "@mui/material";

export type EditableUserStory = Omit<IUserStory, "issue"> & { issue: string }


type UserStoryDialogProps = {
  issueId: string,
  prop_id?: string
  prop_story?: EditableUserStory,
  open: boolean,
  handleClose: () => void,
  onClose: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void,
}


export default function UserStoryDialog(
  { issueId, prop_id, prop_story, open, onClose, handleClose }: UserStoryDialogProps
) {

  const theme = useTheme();
  const { setIssue } = useIssueContext();

  const [story, setStory] = useState<EditableUserStory>(prop_story ?
    { ...prop_story } : {
      issue: issueId,
      description: [{
        textType: "string",
        text: ""
      }],
      engineering_done: false,
      design_done: false,
      database_references: [],
      links: [],
      components: []
    })

  const [joinedDescription, setJoinedDescription] = useState<ReactNode>(getUpdatedDescription());
  const [saving, setSaving] = useState(false);
  const [errorMessageVisible, setErrorMessageVisible] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteErrorMessageVisible, setDeleteErrorMessageVisible] = useState(false);

  useEffect(() => {
    const joinedDescription = (
      <>
        {story.description.map((des, i) => {
          if (des.textType === "string") {
            if (i === story.description.length) {
              return des.text
            } else {
              if (des.text.slice(-1) === " ") return des.text;
              else return (des.text + " ");
            }
          } else return (
            <QueryTooltip
              textType={des.textType}
              text={des.text}
              key={uuidv4()}
            />
          )
        })}
      </>
    )
    setJoinedDescription(joinedDescription);
  }, [story.description]
  )

  // onOpen
  useEffect(() => {
    if (open === true) {
      // reset props
      setErrorMessageVisible(false);
      setStory(prop_story ?
        { ...prop_story } : {
          issue: issueId,
          description: [{
            textType: "string",
            text: ""
          }],
          engineering_done: false,
          design_done: false,
          database_references: [],
          links: [],
          components: []
        }
      );
    }
  }, [open])


  function updateStoryDescriptionTextType(index: number, value: "string" | "tableRef" | "tablePropertyRef" | "pageRef" | "componentRef") {
    const description = structuredClone(story.description);
    description[index].textType = value;

    setStory({
      ...story,
      description
    })
  }

  function updateStoryDescriptionText(index: number, value: string) {
    const description = structuredClone(story.description);
    description[index].text = value;

    setStory({
      ...story,
      description
    })
  }

  function getUpdatedDescription() {
    return (
      story.description.map(des => {
        if (des.textType === "string") {
          return des.text
        } else return (
          <QueryTooltip
            textType={des.textType}
            text={des.text}
            key={uuidv4()}
          />
        )
      })
    )
  }

  function addDescriptionRow() {
    const description = story.description;
    description.push({
      textType: "string",
      text: ""
    })
    setStory({
      ...story,
      description
    })
  }

  async function saveUserStory() {
    try {
      setErrorMessageVisible(false);
      setSaving(true);

      const slug = prop_id ? `/${prop_id}` : '';

      const response = await fetch(`/api/userStories${slug}`, {
        method: 'POST',
        body: JSON.stringify({ story })
      })
      if (response.status < 400) {
        const json = await response.json();
        console.log(json);
        setSaving(false);
        setIssue(json);
        handleClose();
      } else {
        setSaving(false);
        setErrorMessageVisible(true);
      }

    } catch (err) {
      console.log(err);
      setErrorMessageVisible(true);
      setSaving(false);
    }

  }


  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>
        {prop_id ? "Edit " : "Create "}User Story
      </DialogTitle>
      <DialogContent>
        <Box sx={{
          border: "1px solid black",
          margin: 4,
          padding: 2
        }}>
          {joinedDescription}
        </Box>
        <Table>
          <TableBody>
            {story.description.map((description, i) => {
              return (
                <TableRow key={i}>
                  <TableCell sx={{ borderBottom: "none", maxWidth: "5rem" }}>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      variant="standard"
                      value={description.textType}
                      fullWidth
                      label="Type"
                      onChange={(e) => {
                        updateStoryDescriptionTextType(i, e.target.value as "string" | "tableRef" | "tablePropertyRef" | "pageRef" | "componentRef")
                      }}
                    >
                      <MenuItem value={"string"}>Text</MenuItem>
                      <MenuItem value={"tableRef"}>Table Reference</MenuItem>
                      <MenuItem value={"tablePropertyRef"}>Table Property Reference</MenuItem>
                      <MenuItem value={"pageRef"}>Page Reference</MenuItem>
                      <MenuItem value={"componentRef"}>Component Reference</MenuItem>
                    </Select>
                  </TableCell>
                  <TableCell sx={{ borderBottom: "none" }}>
                    <TextField
                      value={description.text}
                      variant="standard"
                      multiline
                      label="Text"
                      fullWidth
                      maxRows={2}
                      onChange={(e) => {
                        updateStoryDescriptionText(i, e.target.value);
                      }}
                    />
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
        <Stack direction="row" justifyContent={"middle"}>
          <Button
            variant="outlined"
            onClick={() => {
              addDescriptionRow();
            }}
            sx={{ margin: "auto" }}
          >
            <Stack direction="row" gap={1}>
              <span>Add Row to User Story</span>
              <AddCircleOutline />
            </Stack>
          </Button>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Stack direction="row" width={"100%"} justifyContent={"space-between"}>
          <Stack direction="row">
            {prop_id &&
            <Button
              sx={{ color: theme.palette.error.main }}
              onClick={() => {
                setDeleteErrorMessageVisible(false);
                setShowDeleteDialog(true);
              }}
            >
              Delete User Story
            </Button>
            }
          </Stack>
          <Stack direction="row" columnGap={2}>
            <Button
              onClick={() => {
                handleClose();
              }}
              variant="outlined"
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={saveUserStory}
            >
              {saving ? <CircularProgress size={25} /> : "Save"}
            </Button>
          </Stack>
        </Stack>
      </DialogActions>
      {errorMessageVisible &&
        <DialogContent>
          <Typography sx={{ color: theme.palette.error.main }}>
            Something went wrong, please try again.
          </Typography>
        </DialogContent>
      }
      <Dialog
        open={showDeleteDialog}
        onClose={(e,r) => setShowDeleteDialog(false)}
      >
        <DialogTitle>
          Are you sure you want to delete this User Story?
        </DialogTitle>
        <DialogActions>
          <Button
            onClick={() => setShowDeleteDialog(false)}
            variant="outlined"
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={async () => {
              try {
                setDeleteErrorMessageVisible(false);
                setDeleting(true);
                const response = await fetch(`/api/userStories/${prop_id}/delete`, {
                  method: 'post',
                  body: JSON.stringify({ story })
                });
                const json = await response.json();
                setDeleting(false);
                setIssue(json);
                setShowDeleteDialog(false);
              } catch(err) {
                setDeleteErrorMessageVisible(true);
                setDeleting(false);
                console.log(err);
              }
            }}
          >
            {deleting ? 
            <CircularProgress sx={{color: "white"}} size={25} /> :
            "Confirm Delete"
            }
          </Button>
        </DialogActions>
        {deleteErrorMessageVisible && 
          <DialogContent>
            <Typography color="error">
              Something went wrong, please try again.
            </Typography>
          </DialogContent>
        }
      </Dialog>
    </Dialog>
  )
}