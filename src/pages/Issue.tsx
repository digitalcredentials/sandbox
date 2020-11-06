import React, { FC, useState } from "react";
import { SigningProps } from "../components/Props";
import { SignedDocumentRequest } from "../api/index";
import { Credential, CredentialEditor, CredentialForm } from "../components";
import { getConfig } from "../utils/config";
import { Title, Content, Container } from  "../utils/styles";

const CONFIG = getConfig();

export const Issue: FC<SigningProps> = ({
  document,
  signedDocument,
  setSignedDocument,
}) => {
  const [loading, setLoading] = useState(false);

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

  return (
    <Container>
      <Title>Issue Credential</Title>
      <Content>
        <CredentialForm handleSubmit={handleSubmit} loading={loading} buttonText={'Sign Credential'} subtitleText={'Assertion Method'} initialValue={CONFIG.signingKeyId}/>
        <Credential
          subTitle="Credential"
          value={JSON.stringify(document, null, 2)}
        />
      </Content>
      <CredentialEditor
        subTitle="Signed Credential"
        value={signedDocument ? JSON.stringify(signedDocument, null, 2) : "{}"}
      />
    </Container>
  );
};
