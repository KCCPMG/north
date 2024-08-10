import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button"; 
import Stack from "@mui/material/Stack";
import BaseDialog from "./BaseDialog";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useIssueContext } from "@/context/IssueContext";
import { useState, useEffect } from "react";


export default function EngFilesDialog() {

  const { 
    issue,
    setIssue,
    engFilesDialogOpen, 
    setEngFilesDialogOpen,
  } = useIssueContext();

  const [
    pendingEngFiles,
    setPendingEngFiles
  ] = useState<Array<string>>(issue.eng_team_files);

  useEffect(() => {
    if (engFilesDialogOpen === true) {
      setPendingEngFiles(issue.eng_team_files);
    }
  }, [engFilesDialogOpen])

  return (
    <BaseDialog 
      title="Engineering Team Files"
      open={engFilesDialogOpen}
      handleClose={()=>{
        setEngFilesDialogOpen(false);
      }}
      handleSave={async () => {
        try {
          const response = await fetch(`api/issues/${issue._id}`, {
            method: 'post',
            body: JSON.stringify({eng_team_files: pendingEngFiles})
          })
          if (response.status >= 400) throw new Error("Response Error");
          const json = await response.json();
          setIssue(json);
        } catch(err) {
          console.log(err);
          throw err;
        }
      }}
      content={
        <Stack direction="column" rowGap={1} >
          {pendingEngFiles.map((file, index) => 
            <Stack direction="row" key={index}>
              <TextField
                variant="outlined"
                fullWidth
                value={file}
                onChange={(e) => {
                  const copy = [...pendingEngFiles];
                  copy[index] = e.target.value;
                  setPendingEngFiles(copy);
                }}
              />
              <Button 
                onClick={() => {
                  const copy = [...pendingEngFiles];
                  copy.splice(index, 1);
                  setPendingEngFiles(copy);
                }}
              >
                <RemoveCircleOutlineIcon />
              </Button>
            </Stack>
          )}
          <Stack direction="row" justifyContent={"middle"}>
            <Button
              variant="outlined"
              onClick={() => {
                const copy = [...pendingEngFiles];
                copy.push("");
                setPendingEngFiles(copy);
              }}
              sx={{ margin: "auto" }}
            >
              <Stack direction="row" gap={1}>
                <span>Add Engineering File</span>
                <AddCircleOutline />
              </Stack>
            </Button>
          </Stack>
        </Stack>
      }
    />
  )
}