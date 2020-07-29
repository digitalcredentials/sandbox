import React, { useState, useContext, HTMLAttributes } from "react";
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

import { VerifiableCredentialEdit } from './VerifiableCredentialEdit';
import { useStyles } from './styles';
import { smallList } from './fixtures';
import { NavBar } from "./NavBar";


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function Dashboard() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [document, setDocument] = useState(smallList[0].document);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavBar document={document} setDocument={setDocument} />

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <VerifiableCredentialEdit document={document} setDocument={setDocument} />
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}
