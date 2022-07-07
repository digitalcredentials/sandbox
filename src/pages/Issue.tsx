import React, { FC, useState } from "react";
import { SigningProps } from "../components/Props";
import { SignCredential } from "../api/local";
import { Credential, IssueForm } from "../components";
import { getConfig } from "../utils/config";
import { JSONEditor } from "@material-did/common";
import {
  Box,
  Button,
  Grid,
  ThemeProvider,
} from "@material-ui/core";
import {IssueParams} from "../api/local";
import theme from "../utils/theme";

// import { encodeToQrCodeUrl, encodeToVpUnsigned } from "../utils/codecs";
// import { ProvePresentationRequest } from "../api/index";
// import { SignedDocumentRequest } from "../api/index";

const CONFIG = getConfig(); 

export const Issue: FC<SigningProps> = ({
  document,
  setDocument,
  signedDocument,
  setSignedDocument,
}) => {
  const [loading, setLoading] = useState(false);
  // const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [options, setOptions] = useState<IssueParams>(
    {
      randomDid: true,
      didSeed: "",
      didMethod: "did:key",
      serializationType: "JSON-LD",
      keySuite: "Ed25519Signature2020",
    }
  );

  // Deprecated submit function that called external sign function
  // const handleSubmit = async (event: any) => {
  //   event.preventDefault();
  //   setLoading(true);
  //   try {
  //     const response = await SignedDocumentRequest(document);
  //     const signedDocument = response.data;
  //     setSignedDocument(signedDocument);
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // Call local signing function on submit
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    try {
      const signedDocument = await SignCredential(document, options);
      setSignedDocument(signedDocument);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const editorOnChange = async (data: string) => {
    try {
      const dataJson = JSON.parse(data);
      setDocument(dataJson);
    } catch (error) {}
  };

  // Deprecated code for encoding QR code
  // const updateQrCodeUrl = async (document: any) => {
  //   const vpUnsigned = encodeToVpUnsigned(document);
  //   const vpSigned = (await ProvePresentationRequest(vpUnsigned)).data;
  //   const qrCodeUrl = await encodeToQrCodeUrl(vpSigned);
  //   setQrCodeUrl(qrCodeUrl);
  // };

  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={4}>
        {/* <Title>Issue Credential</Title> */}
        <Box sx={{ display: "flex", flexGrow: 1 }}>
        {/* <h1>Unsigned Credential</h1>
        <h2>Enter your credential below</h2> */}
        </Box>
        <Grid item xs={12} sm={8}>
          <JSONEditor
            value={JSON.stringify(document, null, 2)}
            onChange={editorOnChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <IssueForm handleSubmit={handleSubmit} loading={loading} formState={options} setOptions={setOptions}/>
        </Grid>
        <Grid item xs={12} >
          <Button onClick={handleSubmit} variant="contained" size="large" color="primary" fullWidth={true}>Issue Credential</Button>
        </Grid>
        <Grid item xs={12}>
          <Credential
            subTitle="Signed Credential"
            value={signedDocument ? JSON.stringify(signedDocument, null, 2) : "{}"}
          />
        </Grid>
        <Grid item xs={12}>
          <Button color="primary" variant="outlined" fullWidth={true}>
            Verify this Credential
          </Button>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};
