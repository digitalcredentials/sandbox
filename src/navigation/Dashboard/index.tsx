import React, { useState } from "react";
import {Box, ThemeProvider} from "@mui/material";
import { smallList } from "../../utils/fixtures";
import { NavBar } from "../NavBar";
import { Issue, Verify, About, Privacy, Terms } from "../../pages";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import { NAV_SIZE } from "../../utils/constants";
import Footer from "./Footer";
import { StyledEngineProvider } from '@mui/material/styles';
import TopNavPanel from "../NavBar/TopNavPanel";
import NavTabs from "../NavBar/NavTabs";
import { VerificationResultsProps } from "../../components/Props";

import theme from "../../utils/theme";
import ScrollToHash from "../../components/ScrollToHash";



const Container = styled.div`
  //TODO: Improve constants reference!!!
  margin: calc(${NAV_SIZE.TOP_NAV_HEIGHT} + 15px) 8% 0
    calc( 8%);
`;

export const Dashboard = () => {
  const [document, setDocument] = useState(JSON.stringify(smallList[0].document, null, 2));
  const [signedDocument, setSignedDocument] = useState({});
  const [unverifiedDocument, setUnverifiedDocument] = useState("");
  const [verificationResult, setVerificationResult] = useState([]);
  const [qrCodeUrls, setQrCodeUrls] = useState(["", ""]);
  const [demoCredential, setDemoCredential] = useState({});
  const [subjectDid, setSubjectDid] = useState('did:example:1234');

  const doSetDocument = (doc: string) => {
    setDocument(doc);
    setSignedDocument({});
  };

  const doSetSignedDocument = (signedDoc: any) => {
    setSignedDocument(signedDoc);
    setUnverifiedDocument(JSON.stringify(signedDoc, null, 2));
    setVerificationResult([]);
  };

  const doSetUnverifiedDocument = (signedDoc: string) => {
    setUnverifiedDocument(signedDoc);
    setVerificationResult([]);
  }

  //TODO: make stricter typing for verification results
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
    <ThemeProvider theme={theme}>
    <Box>
      <Router basename="/sandbox">
        <ScrollToHash/>
        <TopNavPanel/>
        <NavTabs/>
        <Box
          sx={{
            //TODO: change these margins to a const reference!!!
            mt: {
              xs:"-10px",
              sm:"15px",
            },
            mx: "6%",
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
          <Route path="/privacy">
            <Privacy />
          </Route>
          <Route path="/terms">
            <Terms />
          </Route>
          <Route path="/">
            <Issue
              unsignedDocument={document}
              setDocument={doSetDocument}
              signedDocument={signedDocument}
              setSignedDocument={doSetSignedDocument}
              qrCodeUrls={qrCodeUrls}
              setQrCodeUrls={setQrCodeUrls}
            />
          </Route>
        </Switch>
        <Box pt={4}>
          <Footer />
        </Box>
        </Box>
      </Router>
    </Box>
    </ThemeProvider>
    </StyledEngineProvider>
  );
};
