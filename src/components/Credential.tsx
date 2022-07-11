import React from "react";
import styled from "styled-components";
import COLORS from "../utils/colors";
import AceEditor from "react-ace";
import {Box} from "@mui/material";

type PropsType = {
  value: string;
  editing: boolean;
  onChange?: (value: string, event?: any) => void;
};

const Container = styled.div`
  flex-grow: 1 2 auto;
  flex-basis: 50%;
  padding: 10px;
`;

const SubTitle = styled.div`
  font-size: 1.1em;
  font-weight: bold;
  margin-bottom: 20px;
`;

const ContainerEditor = styled.div`
  overflow: hidden;
  border: 3px solid ${COLORS.DAISY_BUSH};
  border-radius: 10px;
  height: 500px;
`;

export const Credential = ({ value, editing, onChange }: PropsType) => {
  if (editing) {
    return <Box
    sx={{borderRadius: "10px", border: "2px solid gray", overflow: "hidden"}}>
      <AceEditor
        value={value}
        onChange={onChange}
        width="100%"
        mode="json"
        theme="tomorrow"
        wrapEnabled={true}
      />
    </Box>
  }
  return <Box
  sx={{borderRadius: "10px", border: "3px solid green", overflow: "hidden", mt: "1.5rem"}}>
    <AceEditor
      value={value}
      width="100%"
      showGutter={false}
      readOnly={true}
      wrapEnabled={true}
      highlightActiveLine={false}
    />
  </Box>
};
