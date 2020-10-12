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
