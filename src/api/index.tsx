import axios from "axios";

import { getConfig } from "../utils/config";

const CONFIG = getConfig()

const instance = axios.create({
  baseURL: CONFIG.signAndVerifyEndpoint,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const SignedDocumentRequest = (source: string) => {
  return instance.post(`issue/credentials`, {
    credential: source, 
    options: {'verificationMethod': CONFIG.signingKeyId}
  });
};

export const VerifyDocumentRequest = (source: string) => {
  return instance.post(`verify/credentials`, {
    verifiableCredential: source, 
    options: {'verificationMethod': CONFIG.signingKeyId}
  });
};

export const ProvePresentationRequest = (source: any) => {
  return instance.post(`/prove/presentations`, {
    presentation: source, 
    options: {'verificationMethod': CONFIG.signingKeyId}
  });
};

export const DemoCredentialRequest = (holder: string) => {
  return instance.post(`request/democredential/nodidproof`, {
    'holder': holder
  });
};
