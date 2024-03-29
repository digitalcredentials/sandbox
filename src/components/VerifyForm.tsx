import React from 'react';
import styled from 'styled-components';
import {
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  FormGroup,
  Select,
  MenuItem,
 } from '@mui/material';
import TextField from '@mui/material/TextField';
import COLORS from '../utils/colors';
import { getConfig } from '../utils/config';

const CONFIG = getConfig();

type PropsType = {
  handleSubmit: (event: any) => void;
  loading: boolean;
  buttonText: string;
  subtitleText: string;
  initialValue: string;
  valueChangeHandler?: (value: string) => void;
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


export const VerifyForm = ({ loading, handleSubmit, buttonText, subtitleText, initialValue, valueChangeHandler }: PropsType) => {

  const handleChange = (event: any) => {
    const { target: { name, value } } = event;
    if (valueChangeHandler) {
      valueChangeHandler(value);
    }
  }

  return (
    <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
      <FormControl>
        {/* DID selection */}
        <FormLabel id="demo-radio-buttons-group-label">Sign With:</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="auto"
          name="radio-buttons-group"
        >
          <FormControlLabel value="auto" control={<Radio />} label="New Random DID" />
          <FormControlLabel value="manual" control={<Radio />} label="Existing DID" />
          <TextField id="standard-basic" label="<paste secret key seed or mnemonic>" variant="standard" />
        </RadioGroup>

        {/* Serialization Parameters */}
        <FormGroup row={true}>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="VC Serialization"
            defaultValue={1}
            onChange={handleChange}
          >
            <MenuItem value={1}>JSON-LD</MenuItem>
            <MenuItem value={2}>JWT</MenuItem>
          </Select>

          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Key Suite"
            defaultValue={1}
            onChange={handleChange}
          >
            <MenuItem value={1}>Ed25519Signature2020</MenuItem>
            <MenuItem value={2}>Jose2020</MenuItem>
          </Select>
        </FormGroup>
      </FormControl>
    </Form>
  );
};
