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
  const env: any = (typeof import.meta !== 'undefined' && (import.meta as any)?.env) || {};
  const getEnv = (key: string, fallback: string) => {
    // Prefer Vite env (VITE_*) then fall back to process.env for backward compat
    const viteVal = env[key] ?? env[`VITE_${key}`];
    // @ts-ignore process may not exist in browser; guarded access
    const procVal = typeof process !== 'undefined' ? (process as any)?.env?.[key] : undefined;
    return (viteVal ?? procVal ?? fallback) as string;
  };

  return Object.freeze({
    signingKeyId: didDocument.assertionMethod[0].id,
    oidcConfigUrl: getEnv('OIDC_CONFIG_URL', 'https://kezike-oidc-provider.herokuapp.com'),
    signAndVerifyApiUrl: getEnv('SIGN_AND_VERIFY_API_URL', 'https://kezike-sign-and-verify.herokuapp.com'),
    provePresentationChallenge: getEnv('PROVE_PRESENTATION_CHALLENGE', 'dcc-pg-123'),
    requestCredentialChallenge: getEnv('REQUEST_CREDENTIAL_CHALLENGE', 'ke12345678-0001')
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
