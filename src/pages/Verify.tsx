import React, { FC, useState } from "react";
import { VerificationProps } from "../components/Props";
import styled from "styled-components";
import COLORS from "../utils/colors";
import { VerifyDocumentRequest } from "../api";
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

export const Verify: FC<VerificationProps> = ({
  signedDocument,
  verificationResult,
  setVerificationResult,
}) => {
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await VerifyDocumentRequest(
        JSON.stringify(signedDocument)
      );
      const result = response.data;
      setVerificationResult(result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>Lorem ipsum</Title>
      <Content>
        <CredentialForm handleSubmit={handleSubmit} loading={loading} />
        <Credential
          subTitle="Signed Credential"
          value={JSON.stringify(signedDocument, null, 2)}
        />
      </Content>
      <CredentialEditor
        subTitle="Verification Result"
        value={
          verificationResult
            ? JSON.stringify(verificationResult, null, 2)
            : "{}"
        }
      />
    </Container>
  );
};
