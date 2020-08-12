import React, { FC, useState } from 'react';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { SigningProps } from './Props';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { JSONEditor } from '@material-did/common';
import { didDocument } from '../fixtures';
import { CircularProgress } from '@material-ui/core';
const fetch = require('node-fetch');


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

export const Issue: FC<SigningProps> = ({
  document, setDocument, signedDocument, setSignedDocument
}) => {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('https://sign-and-verify.herokuapp.com/issue/credentials', {
        method: 'POST',
        body: JSON.stringify(document),
        headers: {
          'Content-Type': 'application/json',
          Accept: "application/json"
        }
      });
      if (response.status !== 201) {
        throw new Error(response.statusText);
      }
      const signedDocument = await response.json();
      setSignedDocument(signedDocument);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={classes.root}>
      <Typography variant="h4" color="primary" gutterBottom>Signing Demonstration (test only)</Typography>
      <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
        <div>
          <Grid container spacing={3} justify="space-around">
            <Grid item xs={6}>
              <Typography variant="h6" color="primary" gutterBottom>Assertion Method</Typography>
              <TextField label="Assertion Method" value={didDocument.publicKey[0].id} style={{ width: 500 }} />
              <br />
              <Button variant="contained" color="primary" type="submit" >
                Sign Credential
              </Button>
              <div>
              { loading &&
                <CircularProgress variant="indeterminate" />
               }
               </div>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" color="primary" gutterBottom>Credential</Typography>
              <JSONEditor value={JSON.stringify(document, null, 2)}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" color="primary" gutterBottom>Signed Credential</Typography>
              <JSONEditor value={signedDocument ? JSON.stringify(signedDocument, null, 2) : '{}'} />
            </Grid>
          </Grid>
        </div>
      </form>
    </div >
  );
};




