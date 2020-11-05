import React from "react";
import styled from "styled-components";
import { CircularProgress } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import COLORS from "../utils/colors";
import { getConfig } from "../utils/config";

const CONFIG = getConfig();

type PropsType = {
  handleSubmit: (event: any) => void;
  loading: boolean;
  buttonText: string;
  subtitleText: string;
  initialValue: string;
  valueChangeHandler?: (value: string) => void;
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


export const CredentialForm = ({ loading, handleSubmit, buttonText, subtitleText, initialValue, valueChangeHandler }: PropsType) => {

  const handleChange = (event: any) => {
    const { target: { name, value } } = event;
    if (valueChangeHandler) {
      valueChangeHandler!(value);
    }
  }

  return (
    <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
      <SubTitle>{subtitleText}</SubTitle>
      <ContainerDidDoc>
        <TextField value={initialValue} style={{ width: 400 }} onChange={handleChange} />
      </ContainerDidDoc>
      <Button type="submit">{buttonText}</Button>
      <div>{loading && <CircularProgress variant="indeterminate" />}</div>
    </Form>
  );
};
