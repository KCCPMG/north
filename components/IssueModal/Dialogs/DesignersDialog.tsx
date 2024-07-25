import BaseDialog from "./BaseDialog";
import { useIssueContext } from "@/context/IssueContext";
import { IUser } from "@/models/User";
import { FormControl, FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { useState, useEffect } from "react";


type FullIUser = IUser & {
  _id: string
}

type PotentialDesigner = FullIUser & {
  assigned: boolean
}

export default function DesignersDialog() {

  const { 
    issue,
    setIssue,
    designersDialogOpen, 
    setDesignersDialogOpen  
  } = useIssueContext();

  const [designers, setDesigners] = useState<Array<PotentialDesigner>>([])

  async function populateDesigners() {
    const response = await fetch('/api/users');
    const json = await response.json();
    const users: PotentialDesigner[] = (json.users as FullIUser[]).map(user => {
      return {
        ...user,
        assigned: false
      }
    });

    console.log(users);

    users.forEach(user => {
      if (issue.assigned_designers.find(ad => ad._id === user._id)) {
        user.assigned = true;
      }
    })

    setDesigners(users);
  }


  useEffect(() => {
    if (designersDialogOpen) populateDesigners();
  }, [designersDialogOpen])

  useEffect(() => {
    console.log(designers);
  }, [designers])



  return (
    <BaseDialog 
      title="Assigned Designers"
      open={designersDialogOpen}
      handleClose={() => {

        setDesignersDialogOpen(false);
      }}
      handleSave={async () => {
        try {
          const response = await fetch(`api/issues/${issue._id}`, {
            method: 'post',
            body: JSON.stringify({assigned_designers: designers.filter(d => d.assigned === true).map(d => d._id)})
          })
          if (response.status >= 400) throw new Error("Response Error");
          const json = await response.json();
          console.log(json);
          setIssue(json);
        } catch(err) {
          console.log(err);
          throw err;
        }
      }}
      content={
        <FormControl>
          <FormGroup>
            {designers.map(designer => 
              <FormControlLabel
                key={designer._id}
                control={
                  <Checkbox 
                    checked={designer.assigned}
                    onChange={(e) => {
                      const designersCopy = [...designers];
                      const foundDesigner = designersCopy.find(d => d._id === designer._id);
                      if (!foundDesigner) throw new Error("Cannot find designer, something went wrong");
                      foundDesigner.assigned = !(foundDesigner.assigned);
                      setDesigners(designersCopy);
                    }}
                  />
                }
                label={designer.email}
              />
            )}
          </FormGroup>
        </FormControl>
      }
    />
  )
}