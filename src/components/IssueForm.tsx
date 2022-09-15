import React from 'react';
import styled from 'styled-components';
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Tooltip,
  Typography,
 } from '@mui/material';
import TextField from '@mui/material/TextField';
import { getConfig } from '../utils/config' ;
import {IssueParams} from '../api/local';
import '../styles/main.css'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
// import { Link } from 'react-router-dom';

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


export const IssueForm = ({ loading, handleSubmit, formState, setOptions}: PropsType) => {

  // Pass any changes to the issue parameters upwards to the parent component state
  const handleChange = (event: any) => {
    const { target: { name, value } } = event;
    switch(name){
      case "randomDid":
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
    // Issue Parameters Form
    <Form
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <Grid
        container
        sx={{
          justifyContent: {
            xs: "center",
            lg: "normal",
          },
        }}
      >
      <Box
        sx={{
          alignContent: "center",
          width: {
            xs: "90%",
            sm: "65%",
            md: "50%",
            lg: "100%",
          },
        }}
        display="flex"
        alignItems="flex-start"
        flexDirection="column"
      >
        {/* Form Title */}
        <Typography
          variant="h2"
          sx={{
            mt: "-.3rem",
            mb: "-0.3rem",
            ml: "-0.2rem",
          }}
        >
          Signing Parameters
        </Typography>

        {/* Did Method Selection */}
        <FormControl
          sx={{width:"100%"}}
        >
          <Box display="flex" sx={{alignItems: "flex-end"}}>
            <FormLabel className="formLabel" id="didmethod">Did Method</FormLabel>
            <Tooltip arrow title="Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.">
              <IconButton>
                <HelpOutlineIcon color="info"/>
              </IconButton>
            </Tooltip>
          </Box>

          <Select
            name="didMethod"
            value={formState.didMethod}
            onChange={handleChange}
          >
            <MenuItem value={"did:key"}>did:key</MenuItem>
            <MenuItem value={"null"}>null</MenuItem>
          </Select>
        </FormControl>

        {/* Flex container brigns text field inline w/ radio group */}
        <Box sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-end",
        }}>
          {/* Radio to choose whether to autogenerate did */}
          <FormControl margin="none">
            <Box display="flex" sx={{alignItems: "flex-end"}}>
              <FormLabel
                id="didselection"
              >
                Sign With
              </FormLabel>
            <Tooltip arrow title="Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.">
                <IconButton>
                  <HelpOutlineIcon color="info"/>
                </IconButton>
            </Tooltip>
            </Box>

            <RadioGroup
              name="randomDid"
              onChange={handleChange}
              value={formState.randomDid.toString()}
            >
              <FormControlLabel
                value="true"
                control={<Radio />}
                label="New Random DID"
              />
              <FormControlLabel
                value="false"
                control={<Radio />}
                label="Existing DID"
              />
            </RadioGroup>
          </FormControl>

          {/* optional did seed */}
          <FormControl sx={{mb: "0.5rem"}}>
              <TextField
                name="didSeed"
                value={formState.didSeed}
                id="standard-basic"
                label="Paste secret key seed"
                variant="standard"
                onChange={handleChange}
                disabled={formState.randomDid}
              />
          </FormControl>
        </Box>

        {/* Key Suite Selection */}
        <FormControl
          sx={{width:"100%"}}
        >
          <Box display="flex" sx={{alignItems: "flex-end"}}>
            <FormLabel
              className="formLabel"
              id="keysuite"
            >
              Key Suite
            </FormLabel>
            <Tooltip arrow title="Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.">
              <IconButton>
                <HelpOutlineIcon color="info"/>
              </IconButton>
            </Tooltip>
          </Box>

          <Select
            name="keySuite"
            value={formState.keySuite}
            onChange={handleChange}
          >
            <MenuItem value={"Ed25519Signature2020"}>
              Ed25519Signature2020
            </MenuItem>
            <MenuItem value={"null"}>
              null
            </MenuItem>
          </Select>
        </FormControl>

        {/* Serialization Type Selection */}
        <FormControl
          sx={{width:"100%"}}
        >
          <Box display="flex" sx={{alignItems: "flex-end"}}>
            <FormLabel
              className="formLabel"
              id="serializationtype"
            >
              Serialization Type
            </FormLabel>
            <Tooltip arrow title="Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.">
              <IconButton>
                <HelpOutlineIcon color="info"/>
              </IconButton>
            </Tooltip>
          </Box>
          <Select
            name="serializationType"
            value={formState.serializationType}
            onChange={handleChange}
          >
            <MenuItem value={"JSON-LD"}>
              JSON-LD
            </MenuItem>
            <MenuItem value={"null"}>
              null
            </MenuItem>
          </Select>
        </FormControl>
      </Box>
      </Grid>
    </Form>
  );
};
