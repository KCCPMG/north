import BaseDialog from "./BaseDialog";
import { useIssueContext } from "@/context/IssueContext";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";

const urlRegex = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i;

export default function GithubLinkDialog() {

  const { 
    issue,
    setIssue,
    githubLinkDialogOpen, 
    setGithubLinkDialogOpen,
  } = useIssueContext();

  const [
    pendingGithubLinkText,
    setPendingGithubLinkText
  ] = useState(issue.eng_team_gh_issue_link || "");
  const [validURL, setValidURL] = useState(true);

  useEffect(() => {
    (pendingGithubLinkText.match(urlRegex) || 
    pendingGithubLinkText === "") ?
      setValidURL(true) :
      setValidURL(false);    
  }, [pendingGithubLinkText])

  return (
    <BaseDialog
      title="Github Issue Link"
      open={githubLinkDialogOpen}
      handleClose={() => {
        setGithubLinkDialogOpen(false) 
      }}
      handleSave={async () => {
        try {
          const response = await fetch(`api/issues/${issue._id}`, {
            method: 'post',
            body: JSON.stringify({eng_team_gh_issue_link: pendingGithubLinkText})
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
        <TextField
          variant="outlined"
          multiline
          maxRows={3}
          fullWidth
          value={pendingGithubLinkText}
          onChange={(e) => setPendingGithubLinkText(e.target.value)}
          error={!validURL}
          helperText={
            validURL ?
            "" :
            "Please enter a valid URL"
          }
        />
      }
      disabled={!validURL}
    />
  )
} 
