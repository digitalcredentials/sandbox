import axios from "axios";
import { createIssuer } from "@digitalcredentials/sign-and-verify-core";
import { getDidDocFromSeed } from "../utils/did";

import { getConfig } from "../utils/config";

const CONFIG = getConfig();

const instance = axios.create({
  baseURL: CONFIG.signAndVerifyApiUrl,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  }
});

export const SignedDocumentRequest = (source: string) => {
  return instance.post(`issue/credentials`, {
    credential: source,
    options: { verificationMethod: CONFIG.signingKeyId }
  });
};

export const VerifyDocumentRequest = (source: string) => {
  return instance.post(`verify/credentials`, {
    verifiableCredential: source,
    options: { verificationMethod: CONFIG.signingKeyId }
  });
};

export const ProvePresentationRequest = (source: any) => {
  return instance.post(`/prove/presentations`, {
    presentation: source,
    options: {
      verificationMethod: CONFIG.signingKeyId,
      challenge: CONFIG.provePresentationChallenge
    }
  });
};

export const DemoCredentialRequest = async (
  holder: string,
  token: string,
  requestEndpoint: string,
  challenge: string
) => {
  const { publicDoc, privateDoc } = await getDidDocFromSeed(holder);
  const { createAndSignPresentation } = createIssuer([privateDoc]);
  const presentation = await createAndSignPresentation(
    null,
    `demo-${publicDoc.id}-${challenge}`,
    publicDoc.id,
    { challenge }
  );
  return axios.post(requestEndpoint, presentation, {
    headers: { Authorization: `Bearer ${token}` }
  });
};
