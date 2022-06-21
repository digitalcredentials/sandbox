import React, { FC, useState } from "react";
import { SigningProps } from "../components/Props";
import { SignedDocumentRequest } from "../api/index";
import { Credential, CredentialEditor, IssueForm } from "../components";
import { getConfig } from "../utils/config";
import { Title, Content, Container } from  "../utils/styles";

import { JSONEditor } from "@material-did/common";
import Button from "@material-ui/core/Button";
import { encodeToQrCodeUrl, encodeToVpUnsigned } from "../utils/codecs";
import { ProvePresentationRequest } from "../api/index";

const CONFIG = getConfig(); 

export const Issue: FC<SigningProps> = ({
  document,
  setDocument,
  signedDocument,
  setSignedDocument,
}) => {
  const [loading, setLoading] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await SignedDocumentRequest(document);
      const signedDocument = response.data;
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
      {/* <Title>Issue Credential</Title> */}
      <Content>
        <JSONEditor
          value={JSON.stringify(document, null, 2)}
          onChange={editorOnChange}
        />

        <IssueForm handleSubmit={handleSubmit} loading={loading} buttonText={'Sign Credential'} subtitleText={'Assertion Method'} initialValue={CONFIG.signingKeyId}/>
        {/* <Credential
          subTitle="Credential"
          value={JSON.stringify(document, null, 2)}
        /> */}
      </Content>
      <Button onClick={handleSubmit} variant="contained" size="large" color="primary">Issue Credential</Button>
      <CredentialEditor
        subTitle="Signed Credential"
        value={signedDocument ? JSON.stringify(signedDocument, null, 2) : "{}"}
      />
      <Button color="primary">
        Verify this Credential
      </Button>
    </Container>
  );
};
