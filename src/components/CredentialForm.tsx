import React from "react";
import styled from "styled-components";
import { CircularProgress } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import COLORS from "../utils/colors";
import { getConfig } from "../utils/config";
import { SubTitle, Button } from "../utils/styles";

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
