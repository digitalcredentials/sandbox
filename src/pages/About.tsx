import React, { FC, useState } from "react";
import { VerificationProps } from "../components/Props";
import { VerifyDocumentRequest } from "../api";
import { Credential, VerifyForm } from "../components";
import { getConfig } from "../utils/config";
import { Title, Content, Container } from  "../utils/styles";

const CONFIG = getConfig();

export const About = ({

}) => {


  return (
    <Container>
      <Title>Verify Credential</Title>
      <Content>
      </Content>
    </Container>
  );
};
