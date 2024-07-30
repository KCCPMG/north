import { useSession } from "next-auth/react"
import Checkbox from "@mui/material/Checkbox";
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from "react";
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

  if (session?.user) {
    if (saving) return <CircularProgress />
    else return <Checkbox 
      checked={checked} 
      onClick={async () => {
        setSaving(true);
        await saveFunction(!checked);
        setSaving(false);
      }}
    />
  }

  else return checked ? <CheckCircleIcon /> : <BlockIcon />

}