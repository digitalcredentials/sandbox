import React from "react";
import styled from "styled-components";
import COLORS from "../utils/colors";
import AceEditor from "react-ace";
import CopyToClipboardButton from './CopyToClipboardButton';

import {
  Box,
  Button,
  Snackbar
} from "@mui/material";

type PropsType = {
  value: string;
  editing: boolean;
  onChange?: (value: string, event?: any) => void;
};

// const CopyToClipboardButton = () => {
//   const [open, setOpen] = useState(false)
// }

// const handleClick = () => {
//   setOpen(true)
//   navigator.clipboard.writeText(window.location.toString()))
// }

export const Credential = ({ value, editing, onChange }: PropsType) => {
  if (editing) {
    return <Box
    sx={{
      borderRadius: "10px",
      border: "2px solid gray",
      overflow: "hidden",
    }}>
      <AceEditor
        value={value}
        onChange={onChange}
        width="100%"
        mode="json"
        theme="tomorrow"
        wrapEnabled={true}
        showPrintMargin={false}
      />
    </Box>
  }
  return <Box
  sx={{
    borderRadius: "10px",
    border: "3px solid green",
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
