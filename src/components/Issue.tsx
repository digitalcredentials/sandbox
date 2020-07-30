import React, { FC, HTMLAttributes } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { DocProps } from './VerifiableCredentialEdit';

import {
  IssueVerifiableCredentialDialog
} from '@material-did/core';


const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#bdbdbd',
  }
}));

export const Issue: FC<DocProps> = ({
  document, setDocument
}) => {
  const classes = useStyles();

  const onSubmit = (data: string) => {
    console.log(data);
  };
  return (
    <div className={classes.root}>
    <IssueVerifiableCredentialDialog
      walletState={undefined}
      component={Button}
      componentProps={{
        variant: 'contained',
        color: 'primary',
      }}
      onSubmit={onSubmit}
    />
    <h6>howdy</h6>
    </div>
  );
};

