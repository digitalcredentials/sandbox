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
  Box,
 } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import COLORS from "../utils/colors";
import { getConfig } from "../utils/config" ;
import {IssueParams} from "../api/local";
import "../styles/main.css"

const CONFIG = getConfig();

type PropsType = {
  handleSubmit: (event: any) => void;
  loading: boolean;
  formState: IssueParams;
  setOptions: (options: IssueParams) => void;
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


export const IssueForm = ({ loading, handleSubmit, formState, setOptions}: PropsType) => {

  // Pass any changes to the issue parameters upwards to the parent component state
  const handleChange = (event: any) => {
    const { target: { name, value } } = event;
    switch(name){
      case "randomDid":
        const newVal = (value == "true");
        console.log(newVal);
        setOptions({...formState, randomDid: value == "true"});
        break;
      case "didSeed":
        setOptions({...formState, didSeed: value});
        break;
      case "didMethod":
        setOptions({...formState, didMethod: value});
        break;
      case "serializationType":
        setOptions({...formState, serializationType: value});
        break;
      case "keySuite":
        setOptions({...formState, keySuite: value});
        break;
    }
  }

  return (
    <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
      <Box  display="flex" alignItems="flex-start" flexDirection="column">
        <FormControl>
          <FormLabel className="formLabel">Did Method</FormLabel>
          <Select
            name="didMethod"
            value={formState.didMethod}
            onChange={handleChange}
          >
            <MenuItem value={"did:key"}>did:key</MenuItem>
            <MenuItem value={"null"}>null</MenuItem>
          </Select>
        </FormControl>

        <FormControl>
          {/* DID selection */}
          <FormLabel>Sign With:</FormLabel>
          <RadioGroup
            name="randomDid"
            onChange={handleChange}
            value={formState.randomDid.toString()}
          >
            <FormControlLabel value="true" control={<Radio />} label="New Random DID" />
            <FormControlLabel value="false" control={<Radio />} label="Existing DID" />
          </RadioGroup>
        </FormControl>

        <FormControl>
            {/* <FormLabel className="formLabel">Did Seed</FormLabel> */}
            <TextField name="didSeed" value={formState.didSeed} id="standard-basic" label="Secret key seed" variant="standard" onChange={handleChange} />
        </FormControl>

        <FormControl>
          <FormLabel className="formLabel">Key Suite</FormLabel>
          <Select
            name="keySuite"
            value={formState.keySuite}
            onChange={handleChange}
          >
            <MenuItem value={"Ed25519Signature2020"}>Ed25519Signature2020</MenuItem>
            <MenuItem value={"null"}>null</MenuItem>
          </Select>
        </FormControl>
          
        <FormControl>  
          <FormLabel className="formLabel">Serialization Type</FormLabel>
          <Select
            name="serializationType"
            value={formState.serializationType}
            onChange={handleChange}
          >
            <MenuItem value={"JSON-LD"}>JSON-LD</MenuItem>
            <MenuItem value={"null"}>null</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Form>
  );
};
