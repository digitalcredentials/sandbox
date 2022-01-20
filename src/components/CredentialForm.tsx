import axios from "axios";
import React from "react";
import OAuth2Login from "react-simple-oauth2-login";
import styled from "styled-components";
import { CircularProgress } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import COLORS from "../utils/colors";
import { getConfig } from "../utils/config";
import { SubTitle, Button } from "../utils/styles";
import { issuerAuthRegistry } from "../utils/fixtures";

const CONFIG = getConfig();

type PropsType = {
  handleSubmit: (event: any) => void;
  loading: boolean;
  buttonText: string;
  subtitleText: string;
  initialValue: string;
  valueChangeHandler?: (value: string) => void;
  oauth?: string;
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

export const CredentialForm = ({
  loading,
  handleSubmit,
  buttonText,
  subtitleText,
  initialValue,
  valueChangeHandler,
  oauth
}: PropsType) => {
  const handleChange = (event: any) => {
    const {
      target: { name, value }
    } = event;
    if (valueChangeHandler) {
      valueChangeHandler(value);
    }
  };

  const issuerAuthConf = oauth
    ? issuerAuthRegistry.entries[oauth]
    : issuerAuthRegistry["issuer.example.com"];

  return (
    <Form
      noValidate
      autoComplete="off"
      onSubmit={oauth ? () => {} : handleSubmit}
    >
      <SubTitle>{subtitleText}</SubTitle>
      <ContainerDidDoc>
        <TextField
          value={initialValue}
          style={{ width: 400 }}
          onChange={handleChange}
        />
      </ContainerDidDoc>
      {oauth ? (
        <OAuth2Login
          authorizationUrl={
            issuerAuthConf.serviceConfiguration.authorizationEndpoint
          }
          clientId={issuerAuthConf.clientId}
          redirectUri={issuerAuthConf.redirectUrl}
          responseType="code"
          scope={issuerAuthConf.scopes}
          buttonText={buttonText}
          onSuccess={({ code }) => {
            axios
              .post(
                issuerAuthConf.serviceConfiguratoion.tokenEndpoint,
                { code },
                {
                  headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                  }
                }
              )
              .then(({ data }) => {
                handleSubmit(data.access_token);
              });
          }}
        />
      ) : (
        <Button type="submit">{buttonText}</Button>
      )}
      <div>{loading && <CircularProgress variant="indeterminate" />}</div>
    </Form>
  );
};
