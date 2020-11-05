import React, { FC, useState } from "react";
import styled from "styled-components";
import COLORS from "../utils/colors";
import { getConfig } from "../utils/config";
import { DemoCredentialRequest } from "../api";
import { RequestProps, GridProps } from "../components/Props";
import { Credential, CredentialForm } from "../components";
const QRCode = require("qrcode.react");

const CONFIG = getConfig();
const requestEndpoint = `${CONFIG.signAndVerifyEndpoint}/request/democredential/nodidproof`

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
  font-size: 1.6em;
`;

const ContainerQRCode = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 260px;
  height: 260px;
  left: 693px;
  top: 332px;
  text-align: center;
  background: ${COLORS.WILD_SAND};
  box-shadow: -20px 20px 40px rgba(196, 196, 196, 0.2),
    20px -20px 40px rgba(196, 196, 196, 0.2),
    -20px -20px 40px rgba(255, 255, 255, 0.9),
    20px 20px 50px rgba(196, 196, 196, 0.9);
  border-radius: 30px;
  margin-top: 30px;
`;

// TODO: add one demo with just above json payload
// TODO: generate QR code for dcc://

export const Request: FC<RequestProps> = ({
  subjectDid,
  setSubjectDid,
  demoCredential,
  setDemoCredential,
}) => {
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await DemoCredentialRequest(subjectDid);
      const result = response.data;
      setDemoCredential(result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (

    <Container>
      <Title>Request Demo Credential</Title>
      <Content>
        <CredentialForm handleSubmit={handleSubmit} loading={loading} buttonText={'Request Demo Credential'} subtitleText='Subject DID' initialValue={subjectDid} valueChangeHandler={setSubjectDid} />
        <Credential
          subTitle="Demo Credential"
          value={JSON.stringify(demoCredential, null, 2)}
        />
      </Content>
      <ContainerQRCode>
        <QRCode value={requestEndpoint} size={200} />
      </ContainerQRCode>
    </Container>
  );
};
