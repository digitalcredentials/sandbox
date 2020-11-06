import React, { FC, useState } from "react";
import styled from "styled-components";
import COLORS from "../utils/colors";
import { getConfig } from "../utils/config";
import { DemoCredentialRequest } from "../api";
import { RequestProps } from "../components/Props";
import { Credential, CredentialForm } from "../components";
import { Title, Content, Container } from "../utils/styles";
import { v4 as uuidv4 } from 'uuid';
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";


const QRCode = require("qrcode.react");

const CONFIG = getConfig();

const DefaultAppPrefix = 'dcc';
const DefaultAppPath = 'request';
const DefaultDeepLinkPrefix = `${DefaultAppPrefix}:${DefaultAppPath}`;
const DefaultRequestEndpoint = `${CONFIG.signAndVerifyEndpoint}/request/democredential`

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

export const Request: FC<RequestProps> = ({
  subjectDid,
  setSubjectDid,
  demoCredential,
  setDemoCredential,
}) => {
  const [loading, setLoading] = useState(false);
  const [challenge, setChallenge] = useState(uuidv4());
  const [requestEndpoint, setRequestEndpoint] = useState(DefaultRequestEndpoint);
  const [deepLinkPrefix, setDeepLinkPrefix] = useState(DefaultDeepLinkPrefix);
  const [deepLink, setDeepLink] = useState(`${DefaultDeepLinkPrefix}?request_url=${DefaultRequestEndpoint}&challenge=${challenge}`);

  function handleChange(fn: any): (event: any) => void {
    return function (event: any) {
      const { target: { name, value } } = event;
      return fn(value);
    }
  }

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
        <div>
          <Typography style={{ width: 600 }} >
            This is the format of the post-authentication deep link into the DCC mobile app. Update the fields below to update the links.
          </Typography>
          <TextField label='Deep Link Prefix' value={deepLinkPrefix} style={{ width: 400 }} onChange={handleChange(setDeepLinkPrefix)} /><br />
          <TextField label='Challenge' value={challenge} style={{ width: 400 }} onChange={handleChange(setChallenge)} /><br />
          <TextField label='Request Endpoint' value={requestEndpoint} style={{ width: 500 }} onChange={handleChange(setRequestEndpoint)} /><br />
        </div>
        <div>
        <Typography style={{ width: 600 }} >
          Deep Link URL: <br />
          <a href={`${deepLinkPrefix}?request_url=${requestEndpoint}&challenge=${challenge}`} >
            {`${deepLinkPrefix}?request_url=${requestEndpoint}&challenge=${challenge}`}
          </a><br /> <br />
        Deep Link QR Code: <br />
        </Typography>
        <ContainerQRCode>
          <QRCode value={`{deepLinkPrefix}?request_url=${requestEndpoint}&challenge=${challenge}`} size={200} />
        </ContainerQRCode>
        </div>
      </Content>
      <Typography style={{ width: 600 }} >
        The stuff below simulates what the mobile app sends to the credential request endpoint (from the deep link above). This specific request doesn't generate a signed presentation; it just includes the subject/holder DID in the correct place.
        We'll update this to generate a signed presentation when sign-and-verify is released as a node module.
      </Typography>
      <br />
      <Content>
        <CredentialForm handleSubmit={handleSubmit} loading={loading} buttonText={'Request Demo Credential'} subtitleText='Subject DID' initialValue={subjectDid} valueChangeHandler={setSubjectDid} />
        <Credential
          subTitle="Demo Credential"
          value={JSON.stringify(demoCredential, null, 2)}
        />
      </Content>
    </Container>
  );
};