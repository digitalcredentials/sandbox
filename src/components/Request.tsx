import React, { FC } from 'react';

import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
var QRCode = require('qrcode.react');


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

export const Request: FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h4" color="primary" gutterBottom>Request Credential Demonstration (test only)</Typography>
      <div>
        <QRCode value="http://127.0.0.1:5000/request/credentials" />
      </div>
    </div >
  );
};




