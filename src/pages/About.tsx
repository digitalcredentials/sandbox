import React, { FC, useState } from "react";
import { VerificationProps } from "../components/Props";
import { VerifyDocumentRequest } from "../api";
import { Credential, VerifyForm } from "../components";
import { getConfig } from "../utils/config";
import { Title, Content, Container } from  "../utils/styles";

const CONFIG = getConfig();

export const About: FC<VerificationProps> = ({
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
        signedDocument
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
      <Title>Verify Credential</Title>
      <Content>
        <VerifyForm handleSubmit={handleSubmit} loading={loading} buttonText={'Verify Credential'} subtitleText={'Assertion Method'} initialValue={CONFIG.signingKeyId}/>
      </Content>
    </Container>
  );
};
