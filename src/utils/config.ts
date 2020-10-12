import { didDocument } from "./fixtures";

export type Config = {
  signAndVerifyEndpoint: string,
  signingKeyId: string,
}


let CONFIG: null | Config = null;

export function parseConfig(): Config {
  return Object.freeze({
    signAndVerifyEndpoint: process.env.SIGN_AND_VERIFY_ENDPOINT ? process.env.SIGN_AND_VERIFY_ENDPOINT  : 'http://127.0.0.1:5000',
    signingKeyId: didDocument.publicKey[0].id
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
