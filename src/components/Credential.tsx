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
  const aceEditor = React.createRef<AceEditor>();

  // Copied from https://github.com/ajaxorg/ace/issues/3149#issuecomment-444570508
  const changeCommandBinding = (name: string, newBindKey: any) => {
    if (aceEditor.current)
    {
      const editor = aceEditor.current.editor;
      const command = editor.commands.byName[name];
      command.bindKey = newBindKey;
      editor.commands.addCommand(command);
      console.log("!")
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
            win: 'Alt-Tab',
            mac: 'Option-Tab',
          })
          changeCommandBinding("outdent", {
            win: 'Alt-Shift-Tab',
            mac: 'Option-Shift-Tab',
          })
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