import React, { FC, useState } from "react";
import { SigningProps } from "../components/Props";
import { SignCredential } from "../api/local";
import { Credential, IssueForm } from "../components";
import { getConfig } from "../utils/config";
import { Title, SubTitle, Content, Container } from  "../utils/styles";
import { JSONEditor } from "@material-did/common";
import {
  Box,
  Button,
  ThemeProvider
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
      <Container>
        {/* <Title>Issue Credential</Title> */}
        <Box display="flex">
        {/* <h1>Unsigned Credential</h1>
        <h2>Enter your credential below</h2> */}
        </Box>
        <Content>
          <JSONEditor
            value={JSON.stringify(document, null, 2)}
            onChange={editorOnChange}
          />

          <IssueForm handleSubmit={handleSubmit} loading={loading} formState={options} setOptions={setOptions}/>
        </Content>
        <Button onClick={handleSubmit} variant="contained" size="large" color="primary">Issue Credential</Button>
        <Credential
          subTitle="Signed Credential"
          value={signedDocument ? JSON.stringify(signedDocument, null, 2) : "{}"}
        />
        <Button color="primary">
          Verify this Credential
        </Button>
      </Container>
    </ThemeProvider>
  );
};
