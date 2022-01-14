import React, { FC, useState } from "react";
import { getConfig } from "../utils/config";
import { DemoCredentialRequest } from "../api";
import { RequestProps } from "../components/Props";
import { Credential, CredentialForm } from "../components";
import { Title, Content, Container, ContainerQRCode } from "../utils/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

const QRCode = require("qrcode.react");

const CONFIG = getConfig();

const DefaultAppPrefix = 'dccrequest';
const DefaultAppPath = 'request';
const DefaultDeepLinkPrefix = `${DefaultAppPrefix}://${DefaultAppPath}`;
const DefaultRequestEndpoint = `${CONFIG.signAndVerifyEndpoint}/request/credential`;
const DefaultIssuerOidcLink = CONFIG.issuerOidcLink;
const DefaultPresentationChallenge = CONFIG.presentationChallenge;

export const Request: FC<RequestProps> = ({
  subjectDid,
  setSubjectDid,
  demoCredential,
  setDemoCredential,
}) => {
  const [loading, setLoading] = useState(false);
  const [challenge, setChallenge] = useState(DefaultPresentationChallenge);
  const [requestEndpoint, setRequestEndpoint] = useState(DefaultRequestEndpoint);
  const [issuerOidcLink, setIssuerOidcLink] = useState(DefaultIssuerOidcLink);
  const [deepLinkPrefix, setDeepLinkPrefix] = useState(DefaultDeepLinkPrefix);
  const [deepLink, setDeepLink] = useState(`${DefaultDeepLinkPrefix}?vc_request_url=${DefaultRequestEndpoint}&issuer=${issuerOidcLink}&challenge=${challenge}`);

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
          <TextField label='Issuer' value={issuerOidcLink} style={{ width: 500 }} onChange={handleChange(setIssuerOidcLink)} /><br />
          <TextField label='Challenge' value={challenge} style={{ width: 400 }} onChange={handleChange(setChallenge)} /><br />
          <TextField label='Request Endpoint' value={requestEndpoint} style={{ width: 500 }} onChange={handleChange(setRequestEndpoint)} /><br />
        </div>
        <div>
        <Typography style={{ width: 600 }} >
          Deep Link URL: <br />
          <a href={`${deepLinkPrefix}?vc_request_url=${requestEndpoint}&issuer=${issuerOidcLink}&challenge=${challenge}`} >
            {`${deepLinkPrefix}?vc_request_url=${requestEndpoint}&issuer=${issuerOidcLink}&challenge=${challenge}`}
          </a><br /> <br />
          Deep Link QR Code: <br />
        </Typography>
        <ContainerQRCode>
          <QRCode value={`${deepLinkPrefix}?vc_request_url=${encodeURIComponent(requestEndpoint)}&issuer=${encodeURIComponent(issuerOidcLink)}&challenge=${challenge}`} size={200} />
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
