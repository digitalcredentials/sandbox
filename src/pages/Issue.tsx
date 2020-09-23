import React, { FC, useState } from "react";
import COLORS from "../utils/colors";
import { SigningProps } from "../components/Props";
import styled from "styled-components";
import { SignedDocumentRequest } from "../api/index";
import { Credential, CredentialEditor, CredentialForm } from "../components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  font-family: Segoe UI;
  font-size: 25px;
  color: ${COLORS.METEORITE};
  margin-top: 20px;
`;

const Content = styled.div`
  display: flex;
  margin-top: 20px;
`;

const Title = styled.div`
  font-size: 2em;
`;

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
      const response = await SignedDocumentRequest(JSON.stringify(document));
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
      <Title>Signing Demonstration (test only)</Title>
      <Content>
        <CredentialForm handleSubmit={handleSubmit} loading={loading} />
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
