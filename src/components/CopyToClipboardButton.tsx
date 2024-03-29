// Button that copies to clipboard whatever string it is given as a prop
// Based on https://codesandbox.io/s/react-copy-to-clipboard-button-with-material-ui-c8sly3?from-embed
import {
  Button,
  Box,
  Snackbar,
 } from '@mui/material'
import { unstable_getThemeValue } from '@mui/system'
import { useState } from 'react'
import React from 'react'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

type PropsType = {
  value: string;
};

const CopyToClipboardButton = ({value}: PropsType) => {
  const [open, setOpen] = useState(false)
  const handleClick = () => {
    setOpen(true)
    // TODO: Make sure that this works on safari once site is published with https!!
    navigator.clipboard.writeText(value)
  }
  return (
    <Box sx={{
      }}>
      <Button
        onClick={handleClick}
        variant="outlined"
        startIcon={<ContentCopyIcon/>}
        sx={{mt: "12px", backgroundColor: "white",}}
        
      >Copy to Clipboard</Button>
      <Snackbar
        open={open}
        onClose={() => setOpen(false)}
        autoHideDuration={2000}
        message="Copied to clipboard"
      />
    </Box>
  )
}
export default CopyToClipboardButton
