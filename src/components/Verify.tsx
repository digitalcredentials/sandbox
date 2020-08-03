import React, { FC, HTMLAttributes, useState } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { DocProps } from './VerifiableCredentialEdit';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { JSONEditor } from '@material-did/common';
import { didDocument, signingPrivateKey } from '../fixtures';
var bundle = require("./bundle");


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

export const Verify: FC<DocProps> = ({
  document, setDocument
}) => {
  const classes = useStyles();

  const [signedDocument, setSignedDocument] = useState(undefined);

  const handleSubmit = (event: any) => {
    console.log(event);
    bundle.e
    //doSign(document, didDocument, signingPrivateKey).then((result) => setSignedDocument(result));
  };
  return (
    <div className={classes.root}>
      <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
        <div>
          <Grid container spacing={3} justify="space-around" alignItems="center">
            <Grid item xs={6}>
              <Typography component="h2" variant="h6" color="primary" gutterBottom>DID Document</Typography>
              <JSONEditor value={JSON.stringify(didDocument, null, 2)} />
            </Grid>
            <Grid item xs={6}>
              <Typography component="h2" variant="h6" color="primary" gutterBottom>Credential</Typography>
              <JSONEditor value={JSON.stringify(document, null, 2)}
              />
            </Grid>
            <Grid item xs={9}>
              <TextField
                id="outlined-multiline-flexible"
                label="Private Key"
                multiline
                style={{ width: 600 }} /* need more space, but fullWidth doesn't propagate */
                rows={5}
                defaultValue={JSON.stringify(signingPrivateKey, null, 2)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={3} alignContent={'center'}>
            <Typography  color="primary" >Coming soon</Typography>
              <Button variant="contained" color="primary" type="submit" disabled >
                Sign Credential
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography component="h2" variant="h6" color="primary" gutterBottom>Signed Credential</Typography>
              <JSONEditor value={signedDocument ? JSON.stringify(signedDocument, null, 2) : '{}'} />
            </Grid>
          </Grid>
        </div>
      </form>
    </div >
  );
};




