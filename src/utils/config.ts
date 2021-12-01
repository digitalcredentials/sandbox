import { didDocument } from "./fixtures";

export type Config = {
  signAndVerifyEndpoint: string;
  signingKeyId: string;
  presentationChallenge: string;
}


let CONFIG: null | Config = null;

export function parseConfig(): Config {
  return Object.freeze({
    signAndVerifyEndpoint: process.env.SIGN_AND_VERIFY_ENDPOINT ? process.env.SIGN_AND_VERIFY_ENDPOINT  : 'https://kezike-sign-and-verify.herokuapp.com',
    signingKeyId: didDocument.assertionMethod[0].id,
    presentationChallenge: 'dcc-pg-123'
  });
}

export function resetConfig() {
  CONFIG = null;
}

export function getConfig(): Config {
  if (!CONFIG) {
    CONFIG = parseConfig();
  }
  return CONFIG;
}
