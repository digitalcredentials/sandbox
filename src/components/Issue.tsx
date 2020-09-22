import React, { FC, useState } from 'react';
import COLORS from '../utils/colors';
import TextField from '@material-ui/core/TextField';
import { SigningProps } from './Props';
import { JSONEditor } from '@material-did/common';
import { didDocument } from '../fixtures';
import styled from 'styled-components';
import { CircularProgress } from '@material-ui/core';
import { SignedDocumentRequest } from './../api/index';

const fetch = require('node-fetch');

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

export const Issue: FC<SigningProps> = ({
  document,
  setDocument,
  signedDocument,
  setSignedDocument,
}) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await SignedDocumentRequest({
        source: JSON.stringify(document),
      });
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
        <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <SubTitle> Assertion Method</SubTitle>
          <ContainerDidDoc>
            <TextField
              value={didDocument.publicKey[0].id}
              style={{ width: 400 }}
            />
          </ContainerDidDoc>
          <Button type="submit">Sign credential</Button>
          <div>{loading && <CircularProgress variant="indeterminate" />}</div>
        </Form>
        <ContainerCredential>
          <SubTitle>Credential</SubTitle>
          <ContainerEditor>
            <JSONEditor value={JSON.stringify(document, null, 2)} />
          </ContainerEditor>
        </ContainerCredential>
      </Content>
      <SubTitle>Signed Credential</SubTitle>
      <ContainerEditor>
        <JSONEditor
          value={
            signedDocument ? JSON.stringify(signedDocument, null, 2) : '{}'
          }
        />
      </ContainerEditor>
    </Container>
  );
};
