import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import { smallList } from "../../utils/fixtures";
import { NavBar } from "../NavBar";
import { VerifiableCredentialEdit, Issue, Verify, About } from "../../pages";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import { NAV_SIZE } from "../../utils/constants";
import Copyright from "./Copyright";

const Container = styled.div`
  margin: calc(${NAV_SIZE.TOP_NAV_HEIGHT} + 40px) 8% 0
    calc(${NAV_SIZE.SIDE_NAV_WIGHT} + 8%);
`;

export const Dashboard = () => {
  const [document, setDocument] = useState(smallList[0].document);
  const [signedDocument, setSignedDocument] = useState({});
  const [verificationResult, setVerificationResult] = useState({});
  const [demoCredential, setDemoCredential] = useState({});
  const [subjectDid, setSubjectDid] = useState('did:example:1234');

  const doSetDocument = (doc: any) => {
    setDocument(doc);
    setSignedDocument({});
  };

  const doSetSignedDocument = (signedDoc: any) => {
    setSignedDocument(signedDoc);
    setVerificationResult({});
  };

  const doSetVerificationResult = (verificationRes: any) => {
    setVerificationResult(verificationRes);
  };

  const doSetDemoCredential = (demoCredential: any) => {
    setDemoCredential(demoCredential);
  };

  const doSetSubjectDid = (subjectDid: any) => {
    setSubjectDid(subjectDid);
  };

  return (
    <Container>
      <Router basename="/playground">
        <NavBar setDocument={doSetDocument} />
        <Switch>
          <Route path="/verify">
            <Verify
              signedDocument={signedDocument}
              setSignedDocument={doSetSignedDocument}
              verificationResult={verificationResult}
              setVerificationResult={doSetVerificationResult}
            />
          </Route>
          <Route path="/about">
            <About
              signedDocument={signedDocument}
              setSignedDocument={doSetSignedDocument}
              verificationResult={verificationResult}
              setVerificationResult={doSetVerificationResult}
            />
          </Route>
          <Route path="/">
            <Issue
              document={document}
              setDocument={doSetDocument}
              signedDocument={signedDocument}
              setSignedDocument={doSetSignedDocument}
            />
          </Route>
        </Switch>
        <Box pt={4}>
          <Copyright />
        </Box>
      </Router>
    </Container>
  );
};
