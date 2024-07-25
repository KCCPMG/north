import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";
import { useState, ReactNode } from "react";
import { CircularProgress } from "@mui/material";
import { useTheme } from "@mui/material";


type BaseDialogProps = {
  title: string,
  open: boolean,
  handleClose: () => void,
  handleSave: () => Promise<void>,
  content: ReactNode,
  disabled?: boolean
}


export default function BaseDialog(
  { title, open, handleClose, content, handleSave, disabled }: BaseDialogProps
) {

  const theme = useTheme();

  const [saving, setSaving] = useState(false);
  const [errorMessageVisible, setErrorMessageVisible] = useState(false);

  return (
    <Dialog fullWidth maxWidth="md" open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {content}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            handleClose();
          }}
          variant="outlined"
        >
          Cancel
        </Button>
        <Button
          disabled={disabled}
          variant="contained"
          onClick={async () => {
            try {
              setSaving(true);
              setErrorMessageVisible(false);
              await handleSave();
              setSaving(false);
              handleClose();
            } catch (err) {
              console.log(err);
              setErrorMessageVisible(true);
            }
          }}
        >
          {saving ? <CircularProgress size={25} /> : "Save"}
        </Button>
      </DialogActions>
      {errorMessageVisible &&
        <DialogContent>
          <Typography sx={{ color: theme.palette.error.main }}>
            Something went wrong, please try again.
          </Typography>
        </DialogContent>
      }
    </Dialog>
  )
}