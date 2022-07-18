import React, { useState } from "react";
import {Box} from "@mui/material";
import { smallList } from "../../utils/fixtures";
import { NavBar } from "../NavBar";
import { Issue, Verify, About } from "../../pages";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import { NAV_SIZE } from "../../utils/constants";
import Copyright from "./Copyright";
import { StyledEngineProvider } from '@mui/material/styles';
import TopNavPanel from "../NavBar/TopNavPanel";
import NavTabs from "../NavBar/NavTabs";



const Container = styled.div`
  //TODO: Improve constants reference!!!
  margin: calc(${NAV_SIZE.TOP_NAV_HEIGHT} + 15px) 8% 0
    calc( 8%);
`;

export const Dashboard = () => {
  const [document, setDocument] = useState(JSON.stringify(smallList[0].document, null, 2));
  const [signedDocument, setSignedDocument] = useState({});
  const [unverifiedDocument, setUnverifiedDocument] = useState("");
  const [verificationResult, setVerificationResult] = useState({});
  const [demoCredential, setDemoCredential] = useState({});
  const [subjectDid, setSubjectDid] = useState('did:example:1234');

  const doSetDocument = (doc: string) => {
    setDocument(doc);
    setSignedDocument({});
  };

  const doSetSignedDocument = (signedDoc: any) => {
    setSignedDocument(signedDoc);
    setUnverifiedDocument(JSON.stringify(signedDoc, null, 2));
    setVerificationResult({});
  };

  const doSetUnverifiedDocument = (signedDoc: string) => {
    setUnverifiedDocument(signedDoc);
    setVerificationResult({});
  }

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
    <StyledEngineProvider injectFirst>
    <Box>
      <Router basename="/playground">
        <TopNavPanel/>
        <NavTabs/>
        <Box
          sx={{
            //TODO: change these margins to a const reference!!!
            mt: "15px",
            mb: "50px",
            mx: "8%",
          }}
        >
        <Switch>
          <Route path="/verify">
            <Verify
              unverifiedDocument={unverifiedDocument}
              setUnverifiedDocument={doSetUnverifiedDocument}
              verificationResult={verificationResult}
              setVerificationResult={doSetVerificationResult}
            />
          </Route>
          <Route path="/about">
            <About
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
        </Box>
      </Router>
    </Box>
    </StyledEngineProvider>
  );
};
