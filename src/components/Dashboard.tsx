import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React, { useState } from "react";
import { smallList } from '../fixtures';
import { NavBar } from "./NavBar";
import { useStyles } from '../styles';
import { VerifiableCredentialEdit } from './VerifiableCredentialEdit';
import { Issue } from './Issue';
import { Verify } from './Verify';

import {
  BrowserRouter as Router,
  Link as RouterLink,
  Switch,
  Route
} from "react-router-dom";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://digitalcredentials.mit.edu/">
        Digital Credentials Consortium
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
  const [signedDocument, setSignedDocument] = useState({});
  const [verificationResult, setVerificationResult] = useState({});

  const doSetDocument = (doc: any) => {
    setDocument(doc);
    setSignedDocument({});
  }

  const doSetSignedDocument = (signedDoc: any) => {
    setSignedDocument(signedDoc);
    setVerificationResult({});
  }

  const doSetVerificationResult = (verificationRes: any) => {
    setVerificationResult(verificationRes);
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Router>
      <NavBar document={document} setDocument={doSetDocument} />

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/issue">
              <Issue document={document} setDocument={doSetDocument} signedDocument={signedDocument} setSignedDocument={doSetSignedDocument} />
            </Route>
            <Route path="/verify">
              <Verify signedDocument={signedDocument} setSignedDocument={doSetSignedDocument} verificationResult={verificationResult} setVerificationResult={doSetVerificationResult}  />
            </Route>
            <Route path="/">
              <VerifiableCredentialEdit document={document} setDocument={doSetDocument} />
            </Route>
          </Switch>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
      </Router>
    </div>
  );
}

function About() {
  return <h2>About</h2>;
}