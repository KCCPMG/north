"use client";
import { IUserStory } from "@/models/UserStory";
import { Dialog, DialogTitle, DialogContent, Box, FormControl, Select, InputLabel, MenuItem, TextField, Stack, Table, TableRow, TableCell } from "@mui/material";
import { useState, useEffect, ReactNode } from "react";
import { v4 as uuidv4 } from 'uuid';
import QueryTooltip from "./QueryTooltip";


type EditableUserStory = Omit<IUserStory, "issue"> & { issue: string }


type UserStoryDialogProps = {
  issueId: string,
  prop_id?: string
  prop_story?: EditableUserStory,
  open: boolean,
  onClose: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void
}


export default function UserStoryDialog(
  { issueId, prop_id, prop_story, open, onClose }: UserStoryDialogProps
) {

  const [story, setStory] = useState<EditableUserStory>(prop_story || {
    issue: issueId,
    description: [],
    engineering_done: false,
    design_done: false,
    database_references: [],
    links: [],
    components: []
  })

  const [joinedDescription, setJoinedDescription] = useState<ReactNode>(getUpdatedDescription())

  // const joinedDescription = story.description.map(des => {
  //   if (des.textType === "string") {
  //     return des.text
  //   } else return (
  //     <QueryTooltip
  //       textType={des.textType}
  //       text={des.text}
  //       key={uuidv4()}
  //     />
  //   )
  // })

  useEffect(() => {
    const joinedDescription = (
      <>
        {story.description.map(des => {
          if (des.textType === "string") {
            return des.text
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
  }, [story])


  function updateStoryDescriptionTextType(index: number, value: "string" | "tableRef" | "tablePropertyRef" | "pageRef" | "componentRef") {
    const description = story.description;
    description[index].textType = value;

    setStory({
      ...story,
      description
    })
  }

  function updateStoryDescriptionText(index: number, value: string) {
    const description = story.description;
    description[index].text = value;

    setStory({
      ...story,
      description
    })
  }


  // function updateStory(field: "textType" | "text", index: number, value: string) {

  //   const description = story.description;

  //   description[i][field] = value;

  //   setStory({
  //     ...story,
  //     description
  //   })
  // }


  // function changeDescriptionType(descriptionType: string, index: number) {
  //   story.description[index]
  // }

  function updateJoinedDescription() {
    setJoinedDescription(getUpdatedDescription())
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

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
    >
      <>
        <DialogTitle>{prop_id ? "Edit " : "Create "}User Story</DialogTitle>
        <DialogContent>
          <Box sx={{
            border: "1px solid black",
            margin: 4,
            padding: 1
          }}>
            {joinedDescription}
          </Box>
          {/* <Stack direction="column" gap={1}> */}
          <Table>
            {story.description.map((description, i) => {
              return (
                // <Stack direction="row" key={i} spacing={1}>
                <TableRow>
                  {/* <FormControl fullWidth > */}
                  <TableCell>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      variant="standard"
                      value={description.textType}
                      // sx={maxWidth}
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

                  {/* <InputLabel>Text</InputLabel> */}
                  <TableCell>
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
                    {/* </FormControl> */}
                    {/* </Stack> */}
                  </TableCell>
                </TableRow>
              )
            })}
          </Table>
          {/* </Stack> */}
        </DialogContent>
      </>
    </Dialog>
  )
}