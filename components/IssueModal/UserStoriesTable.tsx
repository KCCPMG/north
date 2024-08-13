"use client";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import Typography from "@mui/material/Typography";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import Stack from "@mui/material/Stack";
import { IUserStory } from "@/models/UserStory";
import UserStoryRow from "./UserStoryRow";
import { useIssueContext } from "@/context/IssueContext";
import { useState } from "react";
import UserStoryDialog from "./Dialogs/UserStoryDialog";
import { AddCircleOutline } from "@mui/icons-material";
import { useSession } from "next-auth/react";


type UserStoriesProps = {
  issueId: string,
  stories: Array<IUserStory & { _id: string }>,
  refresh: () => void
}

export default function UserStories({ issueId, stories, refresh }: UserStoriesProps) {

  const { data: session } = useSession();
  const [showUserStoryDialog, setShowUserStoryDialog] = useState(false);

  return (
    <>
      <Typography variant="h6">User Stories</Typography>
      <Table sx={{ marginTop: 2 }}>
        <TableHead>
          <TableRow>
            {session?.user &&
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
            <UserStoryRow
              story={story}
              showUserStoryDialog={showUserStoryDialog}
              setShowUserStoryDialog={setShowUserStoryDialog}
              key={story._id}
              refresh={refresh}
            />
          )}
        </TableBody>
      </Table>
      <DialogActions>
        {session?.user &&
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
              handleClose={() => setShowUserStoryDialog(false)}
              onClose={(e, r) => {
                setShowUserStoryDialog(false);
              }}
            />
          </>
        }
      </DialogActions>
    </>
  )
}