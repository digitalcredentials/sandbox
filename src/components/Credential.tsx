import React from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-json';
import CopyToClipboardButton from './CopyToClipboardButton';

import { Box } from '@mui/material';

type PropsType = {
  value: string;
  editing: boolean;
  onChange?: (value: string, event?: any) => void;
};


// Editor window for editing, viewing credentials
export const Credential = ({ value, editing, onChange }: PropsType) => {
  // Editor version
  if (editing) {
    return <Box
    sx={{
      borderRadius: "10px",
      border: "1px solid gray",
      overflow: "hidden",
    }}>
      <AceEditor
        value={value}
        onChange={onChange}
        width="100%"
        mode="json"
        wrapEnabled={true}
        showPrintMargin={false}
      />
    </Box>
  }

  // Viewer version
  return <Box
  sx={{
    borderRadius: "10px",
    border: "1px solid green",
    overflow: "hidden",
    mt: ".5rem",
    alignContent: "flex-end"
  }}>
    <CopyToClipboardButton value={value}/>
    <AceEditor
      value={value}
      width="100%"
      showGutter={false}
      readOnly={true}
      wrapEnabled={true}
      highlightActiveLine={false}
      showPrintMargin={false}
    />
  </Box>
};
