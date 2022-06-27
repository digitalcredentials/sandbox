import React from "react";
import styled from "styled-components";
import { 
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  FormGroup,
  Select,
  MenuItem,
 } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import COLORS from "../utils/colors";
import { getConfig } from "../utils/config" ;
import {IssueParams} from "../api/local";

const CONFIG = getConfig();

type PropsType = {
  handleSubmit: (event: any) => void;
  loading: boolean;
  initialValue: IssueParams;
  valueChangeHandler?: (name: string, value: any) => void;
};

const Form = styled.form`
  flex-grow: 1 1 auto;
  flex-basis: 50%;
  padding: 10px;
`;

const ContainerDidDoc = styled.div`
  font-size: 0.3em;
  color: ${COLORS.METEORITE};
`;


export const IssueForm = ({ loading, handleSubmit, initialValue, valueChangeHandler }: PropsType) => {

  const handleChange = (event: any) => {
    const { target: { name, value } } = event;
    if (valueChangeHandler) {
      valueChangeHandler(name, value);
    }
  }

  return (
    <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
      <FormControl>
        {/* DID selection */}
        <FormLabel id="demo-radio-buttons-group-label">Sign With:</FormLabel>
        <RadioGroup
          defaultValue={initialValue.randomDid ? "true" : "false"}
          name="randomDid"
          onChange={handleChange}
        >
          <FormControlLabel value="true" control={<Radio />} label="New Random DID" />
          <FormControlLabel value="false" control={<Radio />} label="Existing DID" />
          <TextField name="didSeed" id="standard-basic" label="Secret key seed" variant="standard" onChange={handleChange} />
        </RadioGroup>
        
        {/* Serialization Parameters */}
        <Select
          name="didMethod"
          defaultValue={initialValue.didMethod}
          onChange={handleChange}
        >
          <MenuItem value={"did:key"}>did:key</MenuItem>
          <MenuItem value={"null"}>null</MenuItem>
        </Select>
        
        <Select
          name="serializationType"
          defaultValue={initialValue.serializationType}
          onChange={handleChange}
        >
          <MenuItem value={"JSON-LD"}>JSON-LD</MenuItem>
          <MenuItem value={"null"}>null</MenuItem>
        </Select>

        <Select
          name="keySuite"
          defaultValue={initialValue.keySuite}
          onChange={handleChange}
        >
          <MenuItem value={"Ed25519Signature2020"}>Ed25519Signature2020</MenuItem>
          <MenuItem value={"null"}>null</MenuItem>
        </Select>
      </FormControl>
    </Form>
  );
};
