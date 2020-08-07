import React, { FC } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { VerificationProps } from './Props';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { JSONEditor } from '@material-did/common';
import { didDocument } from '../fixtures';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }),
);


export const Verify: FC<VerificationProps> = ({
  signedDocument, setSignedDocument, verificationResult, setVerificationResult
}) => {
  const classes = useStyles();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const response = await fetch('https://sign-and-verify.herokuapp.com/verify/credentials', {
        method: 'POST',
        body: JSON.stringify(signedDocument),
        headers: {
          'Content-Type': 'application/json',
          Accept: "application/json"
        }
      });
      if (response.status !== 201) {
        throw new Error(response.statusText);
      }
      const result = await response.json();
      setVerificationResult(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.root}>
      <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
        <div>
          <Grid container spacing={3} justify="space-around" alignItems="center">
          <Grid item xs={6}>
              <Typography variant="h6" color="primary" gutterBottom>Assertion Method</Typography>
              <TextField label="Assertion Method" value={didDocument.publicKey[0].id} style={{ width: 500 }} />
              <br />
              <Button variant="contained" color="primary" type="submit" >
                Verify Signed Credential
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" color="primary" gutterBottom>Signed Credential</Typography>
              <JSONEditor value={JSON.stringify(signedDocument, null, 2)}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" color="primary" gutterBottom>Verification Result</Typography>
              <JSONEditor value={verificationResult ? JSON.stringify(verificationResult, null, 2) : '{}'} />
            </Grid>
          </Grid>
        </div>
      </form>
    </div >
  );
};




