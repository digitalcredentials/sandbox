import React from "react";
import styled from "styled-components";
import { CircularProgress } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { didDocument } from "../utils/fixtures";
import COLORS from "../utils/colors";

type PropsType = {
  handleSubmit: (event: any) => void;
  loading: boolean;
};

const Form = styled.form`
  flex-grow: 1 1 auto;
  flex-basis: 50%;
  padding: 10px;
`;

const ContainerDidDoc = styled.div`
  font-size: 0.3em;
  color: ${COLORS.METEORITE};
`;

const SubTitle = styled.div`
  font-size: 1.1em;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Button = styled.button`
  font-size: 0.8em;
  height: 2em;
  border: none;
  border-radius: 10px;
  color: ${COLORS.METEORITE};
  margin-top: 2em;
  background: ${COLORS.ALABASTER};
  box-shadow: -10px 10px 20px rgba(211, 211, 211, 0.2),
    10px -10px 20px rgba(211, 211, 211, 0.2),
    -10px -10px 20px rgba(255, 255, 255, 0.9),
    10px 10px 25px rgba(211, 211, 211, 0.9);
`;

export const CredentialForm = ({ loading, handleSubmit }: PropsType) => {
  return (
    <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
      <SubTitle>Assertion Method</SubTitle>
      <ContainerDidDoc>
        <TextField value={didDocument.publicKey[0].id} style={{ width: 400 }} />
      </ContainerDidDoc>
      <Button type="submit">Sign credential</Button>
      <div>{loading && <CircularProgress variant="indeterminate" />}</div>
    </Form>
  );
};
