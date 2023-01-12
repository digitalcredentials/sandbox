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
import DownloadIcon from '@mui/icons-material/Download';

type PropsType = {
  value: string;
};

const DownloadButton = ({value}: PropsType) => {
  const [open, setOpen] = useState(false)
  const downloadFile = () => {
    const element = document.createElement("a");
    const file = new Blob([value], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "credential.json";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    setOpen(true);
  }
  return (
    <Box sx={{
      }}>
      <Button
        onClick={downloadFile}
        variant="outlined"
        sx={{mt: "12px", backgroundColor: "white",}}
        startIcon={<DownloadIcon/>}
        
      >Download JSON</Button>
      <Snackbar
        open={open}
        onClose={() => setOpen(false)}
        autoHideDuration={2000}
        message="File download complete"
      />
    </Box>
  )
}
export default DownloadButton
