import React, { FC, useState } from "react";
import { SigningProps } from "../components/Props";
import { SignedDocumentRequest } from "../api/index";
import { SignCredential } from "../api/local";
import { Credential, IssueForm } from "../components";
import { getConfig } from "../utils/config";
import { Title, SubTitle, Content, Container } from  "../utils/styles";

import { JSONEditor } from "@material-did/common";
import Button from "@material-ui/core/Button";
import { encodeToQrCodeUrl, encodeToVpUnsigned } from "../utils/codecs";
import { ProvePresentationRequest } from "../api/index";
import {IssueParams} from "../api/local";

const CONFIG = getConfig(); 

export const Issue: FC<SigningProps> = ({
  document,
  setDocument,
  signedDocument,
  setSignedDocument,
}) => {
  const [loading, setLoading] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [options, setOptions] = useState(
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

  const optionsOnChange = async (name: string, value: any) => {
    switch(name){
      case "randomDid":
        const newVal = (value == "true");
        console.log(newVal);
        setOptions({...options, randomDid: value == "true"});
        break;
      case "didSeed":
        setOptions({...options, didSeed: value});
        break;
      case "didMethod":
        setOptions({...options, didMethod: value});
        break;
      case "serializationType":
        setOptions({...options, serializationType: value});
        break;
      case "keySuite":
        setOptions({...options, keySuite: value});
        break;
    }
  }
  
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

  const updateQrCodeUrl = async (document: any) => {
    const vpUnsigned = encodeToVpUnsigned(document);
    const vpSigned = (await ProvePresentationRequest(vpUnsigned)).data;
    const qrCodeUrl = await encodeToQrCodeUrl(vpSigned);
    setQrCodeUrl(qrCodeUrl);
  };

  return (
    <Container>
      <Title>Unsigned Credentials</Title>
      <SubTitle>Enter your credential below</SubTitle>
      <Content>
        <JSONEditor
          value={JSON.stringify(document, null, 2)}
          onChange={editorOnChange}
        />

        <IssueForm handleSubmit={handleSubmit} loading={loading} initialValue={options} valueChangeHandler={optionsOnChange}/>
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
  );
};
