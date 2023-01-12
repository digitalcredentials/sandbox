import React from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/webpack-resolver';
import CopyToClipboardButton from './CopyToClipboardButton';
import DownloadButton from './DownloadButton';

import {
  Box,
  Grid,
} from '@mui/material';

type PropsType = {
  value: string;
  editing: boolean;
  onChange?: (value: string, event?: any) => void;
};

// Editor window for editing, viewing credentials
export const Credential = ({ value, editing, onChange }: PropsType) => {
  const aceEditor = React.createRef<AceEditor>();

  // Copied from https://github.com/ajaxorg/ace/issues/3149#issuecomment-444570508
  const changeCommandBinding = (name: string, newBindKey: any) => {
    if (aceEditor.current)
    {
      const editor = aceEditor.current.editor;
      const command = editor.commands.byName[name];
      command.bindKey = newBindKey;
      editor.commands.addCommand(command);
    }
  }

  // Editor version
  if (editing) {
    return <Box
    sx={{
      borderRadius: "10px",
      border: "1px solid gray",
      overflow: "hidden",
    }}>
      <AceEditor
        ref={aceEditor}
        value={value}
        onChange={onChange}
        width="100%"
        height="22rem"
        mode="json"
        wrapEnabled={true}
        showPrintMargin={false}
        onFocus={() => {
          changeCommandBinding("indent", {
            win: 'Ctrl-Tab',
            mac: 'Option-Tab',
          })
          changeCommandBinding("outdent", {
            win: 'Ctrl-Shift-Tab',
            mac: 'Option-Shift-Tab',
          })
        }}
        setOptions={{
          useWorker: false
        }}
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
    position: "relative",
    alignContent: "flex-end"
  }}>
    <Grid
      container
      spacing={2}
      sx={{
        position: "absolute",
        zIndex: 99,
        //TODO: Reference constants in margin!!!
        right: "0px",
        alignSelf: "flex-end",
        width: "300px",
        mr: "20px",
      }}
    >
      <Grid item xs={6}>
        <CopyToClipboardButton value={value}/>
      </Grid>
      <Grid item xs={6}>
        <DownloadButton value={value}/>
      </Grid>
    </Grid>

    <AceEditor
      value={value}
      width="100%"
      showGutter={false}
      readOnly={true}
      wrapEnabled={true}
      highlightActiveLine={false}
      showPrintMargin={false}
      mode="json"
      setOptions={{
        useWorker: false
      }}
    />
  </Box>
};