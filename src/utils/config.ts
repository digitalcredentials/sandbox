import { didDocument } from "./fixtures";

export type Config = {
  signingKeyId: string;
  oidcConfigUrl: string;
  signAndVerifyApiUrl: string;
  provePresentationChallenge: string;
  requestCredentialChallenge: string;
}

let CONFIG: null | Config = null;

export function parseConfig(): Config {
  return Object.freeze({
    signingKeyId: didDocument.assertionMethod[0].id,
    oidcConfigUrl: process.env.OIDC_CONFIG_URL ? process.env.OIDC_CONFIG_URL  : 'https://kezike-oidc-provider.herokuapp.com',
    signAndVerifyApiUrl: process.env.SIGN_AND_VERIFY_API_URL ? process.env.SIGN_AND_VERIFY_API_URL  : 'https://kezike-sign-and-verify.herokuapp.com',
    provePresentationChallenge: process.env.PROVE_PRESENTATION_CHALLENGE ? process.env.PROVE_PRESENTATION_CHALLENGE : 'dcc-pg-123',
    requestCredentialChallenge: process.env.REQUEST_CREDENTIAL_CHALLENGE ? process.env.REQUEST_CREDENTIAL_CHALLENGE : 'ke12345678-0001'
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
