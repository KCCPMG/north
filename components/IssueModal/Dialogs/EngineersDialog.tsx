import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import BaseDialog from "./BaseDialog";
import { useIssueContext } from "@/context/IssueContext";
import { IUser } from "@/models/User";
import { useState, useEffect } from "react";


type FullIUser = IUser & {
  _id: string
}

type PotentialEngineer = FullIUser & {
  assigned: boolean
}

export default function EngineersDialog() {

  const { 
    issue,
    setIssue,
    engineersDialogOpen, 
    setEngineersDialogOpen  
  } = useIssueContext();

  const [engineers, setEngineers] = useState<Array<PotentialEngineer>>([])

  async function populateEngineers() {
    const response = await fetch('/api/users');
    const json = await response.json();
    const users: PotentialEngineer[] = (json.users as FullIUser[]).map(user => {
      return {
        ...user,
        assigned: false
      }
    });

    users.forEach(user => {
      if (issue.assigned_engineers.find(ae => ae._id === user._id)) {
        user.assigned = true;
      }
    })
    setEngineers(users);
  }

  useEffect(() => {
    if (engineersDialogOpen) populateEngineers();
  }, [engineersDialogOpen])

  return (
    <BaseDialog 
      title="Assigned Engineers"
      open={engineersDialogOpen}
      handleClose={() => {
        setEngineersDialogOpen(false);
      }}
      handleSave={async () => {
        try {
          const response = await fetch(`api/issues/${issue._id}`, {
            method: 'post',
            body: JSON.stringify({assigned_engineers: engineers.filter(d => d.assigned === true).map(d => d._id)})
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
        <FormControl>
          <FormGroup>
            {engineers.map(engineer => 
              <FormControlLabel
                key={engineer._id}
                control={
                  <Checkbox 
                    checked={engineer.assigned}
                    onChange={(e) => {
                      const engineersCopy = [...engineers];
                      const foundEngineer = engineersCopy.find(d => d._id === engineer._id);
                      if (!foundEngineer) throw new Error("Cannot find engineer, something went wrong");
                      foundEngineer.assigned = !(foundEngineer.assigned);
                      setEngineers(engineersCopy);
                    }}
                  />
                }
                label={engineer.email}
              />
            )}
          </FormGroup>
        </FormControl>
      }
    />
  )
}