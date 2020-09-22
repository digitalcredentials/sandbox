import React, { FC, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { VerificationProps } from './Props';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { JSONEditor } from '@material-did/common';
import { didDocument } from '../fixtures';
import { CircularProgress } from '@material-ui/core';
import styled from 'styled-components';
import COLORS from '../utils/colors';
import { VerifyDocumentRequest } from '../api';

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

const Form = styled.form`
  flex-grow: 1 1 auto;
  flex-basis: 50%;
  padding: 10px;
`;

const SubTitle = styled.div`
  font-style: italic;
  font-size: 1.6em;
  font-weight: bold;
  margin-bottom: 20px;
`;

const ContainerDidDoc = styled.div`
  font-size: 0.3em;
  color: ${COLORS.METEORITE};
`;

const Button = styled.button`
  font-size: 0.8em;
  height: 2em;
  border: none;
  border-radius: 10px;
  color: ${COLORS.METEORITE};
  margin-top: 2em;
  background: #f8f8f8;
  box-shadow: -10px 10px 20px rgba(211, 211, 211, 0.2),
    10px -10px 20px rgba(211, 211, 211, 0.2),
    -10px -10px 20px rgba(255, 255, 255, 0.9),
    10px 10px 25px rgba(211, 211, 211, 0.9);
`;

const ContainerCredential = styled.div`
  flex-grow: 1 2 auto;
  flex-basis: 50%;
  padding: 10px;
`;

const ContainerEditor = styled.div`
  overflow: hidden;
  border: 10px solid #4827a7;
  border-radius: 20px;
  height: 500px;
`;

export const Verify: FC<VerificationProps> = ({
  signedDocument,
  setSignedDocument,
  verificationResult,
  setVerificationResult,
}) => {
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await VerifyDocumentRequest({
        source: JSON.stringify(signedDocument),
      });
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
        <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <SubTitle> Assertion Method</SubTitle>
          <ContainerDidDoc>
            <TextField
              value={didDocument.publicKey[0].id}
              style={{ width: 400 }}
            />
          </ContainerDidDoc>
          <Button type="submit">Verify sign credential</Button>
          <div>{loading && <CircularProgress variant="indeterminate" />}</div>
        </Form>
        <ContainerCredential>
          <SubTitle>Signed Credential</SubTitle>
          <ContainerEditor>
            <JSONEditor value={JSON.stringify(signedDocument, null, 2)} />
          </ContainerEditor>
        </ContainerCredential>
      </Content>
      <SubTitle>Verification Result</SubTitle>
      <ContainerEditor>
        <JSONEditor
          value={
            verificationResult
              ? JSON.stringify(verificationResult, null, 2)
              : '{}'
          }
        />
      </ContainerEditor>
    </Container>
  );
};
