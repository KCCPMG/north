import { TableCell, TableHead, TableRow, Table, Typography, TableBody } from "@mui/material"

import { IUserStory } from "@/models/UserStory";
import UserStory from "./UserStory";


type UserStoriesProps = {
  stories: Array<IUserStory & {_id: string}>
}

export default function UserStories({stories}: UserStoriesProps) {

  return (
    <Table sx={{ marginTop: 2 }}>
      <TableHead>
        <Typography variant="h6">User Stories</Typography>
        <TableRow>
          <TableCell>
            Story
          </TableCell>
          <TableCell sx={{textAlign: "center"}}>Design</TableCell>
          <TableCell sx={{textAlign: "center"}}>Engineering</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {stories.map(story => 
          <UserStory story={story} key={story._id} />
        )}
      </TableBody>
    </Table>
  )
}