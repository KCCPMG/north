"use client";
import { TableCell, TableHead, TableRow, Table, Typography, TableBody, Button, DialogActions, Stack } from "@mui/material"
import { IUserStory } from "@/models/UserStory";
import UserStory from "./UserStoryRow";
import { useEditIssueContext } from "@/context/EditIssueContext";
import { useState } from "react";
import UserStoryDialog from "./UserStoryDialog";
import { AddCircleOutline } from "@mui/icons-material";


type UserStoriesProps = {
  issueId: string,
  stories: Array<IUserStory & { _id: string }>
}

export default function UserStories({ issueId, stories }: UserStoriesProps) {

  const { editMode } = useEditIssueContext();
  const [showUserStoryDialog, setShowUserStoryDialog] = useState(false);

  return (
    <>
      <Typography variant="h6">User Stories</Typography>
      <Table sx={{ marginTop: 2 }}>
        <TableHead>
          <TableRow>
            {editMode &&
              <TableCell>Edit</TableCell>
            }
            <TableCell>
              Story
            </TableCell>
            <TableCell sx={{ textAlign: "center" }}>Design</TableCell>
            <TableCell sx={{ textAlign: "center" }}>Engineering</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stories.map(story =>
            <UserStory
              story={story}
              showUserStoryDialog={showUserStoryDialog}
              setShowUserStoryDialog={setShowUserStoryDialog}
              key={story._id}
            />
          )}
        </TableBody>
      </Table>
      <DialogActions>
        {editMode &&
          <>
            <Button
              variant="outlined"
              onClick={() => {
                console.log("open showUserStoryDialog")
                setShowUserStoryDialog(true)
              }}
              sx={{ margin: "auto" }}
            >
              <Stack direction="row" gap={1}>
                <span>Create Additional User Story</span>
                <AddCircleOutline />
              </Stack>

            </Button>
            <UserStoryDialog
              issueId={issueId}
              open={showUserStoryDialog}
              onClose={(e, r) => {
                console.log("close showUserStoryDialog")
                console.log({ e });
                console.log({ r });
                setShowUserStoryDialog(false);
              }}
            />
          </>
        }
      </DialogActions>
    </>
  )
}