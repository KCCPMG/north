import { useSession } from "next-auth/react"
import Checkbox from "@mui/material/Checkbox";
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from "react";
import { saveIssue } from "@/lib/api";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BlockIcon from '@mui/icons-material/Block';


type IssueCheckboxProps = {
  checked: boolean,
  saveFunction: (newValue: boolean) => Promise<void>
}

export default function IssueCheckbox({checked, saveFunction}: IssueCheckboxProps) {
  const { data: session } = useSession();
  const [saving, setSaving] = useState(false);


  async function handleClick() {
    try {
      setSaving(true);
      await saveFunction(!checked);
      setSaving(false);
    } catch(err) {
      console.log(err);
      setSaving(false);
      // TODO: add toast notification
    }
  }


  return (
    <>
      {session?.user ?     
        saving ? 
          <CircularProgress size={20} /> : 
          <Checkbox 
            checked={checked} 
            onClick={handleClick}
          />
        :
        checked ?
          <CheckCircleIcon color="primary" /> : 
          <BlockIcon />
      }
    </>
  )

}