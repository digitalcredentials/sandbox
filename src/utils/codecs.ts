import { contexts as ldContexts, documentLoaderFactory } from '@transmute/jsonld-document-loader';
// TODO: The DCC fork of vpq is not working at the moment
// import * as vpqr from '@digitalcredentials/vpqr';
import * as vpqr from '@digitalbazaar/vpqr';
import * as didContext from '@digitalcredentials/did-context';
import * as ed25519 from 'ed25519-signature-2020-context';
// Lazy import of DCC context to avoid Vite dep-scan issues
let CONTEXT_URL_V1: string;
let CONTEXT_V1: any;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const dcc = require('@digitalcredentials/dcc-context');
  CONTEXT_URL_V1 = dcc.CONTEXT_URL_V1;
  CONTEXT_V1 = dcc.CONTEXT_V1;
} catch (e) {
  // Fallback values to prevent boot failure; real resolution happens when libs load
  CONTEXT_URL_V1 = 'https://purl.imsglobal.org/spec/ob/v3p0/context-3.0.0.json';
  CONTEXT_V1 = {};
}

const W3C_CONTEXT_URL_2018_V1 = 'https://www.w3.org/2018/credentials/v1';
const W3C_CONTEXT_VP_TYPE_2018_V1 = 'VerifiablePresentation';

const getCustomLoader = () => {
  const customLoaderProto = documentLoaderFactory.pluginFactory
  .build({
    contexts: {
      ...ldContexts.W3C_Verifiable_Credentials,
      ...ldContexts.W3ID_Security_Vocabulary,
      ...ldContexts.W3C_Decentralized_Identifiers
    },
  })
  .addContext({ [ed25519.constants.CONTEXT_URL]: ed25519.contexts.get(ed25519.constants.CONTEXT_URL) })
  .addContext({ [didContext.constants.DID_CONTEXT_URL]: didContext.contexts.get(didContext.constants.DID_CONTEXT_URL) })
  .addContext({ [CONTEXT_URL_V1]: CONTEXT_V1 })
  return customLoaderProto;
};

const customLoaderProto = getCustomLoader();
const documentLoader = customLoaderProto.buildDocumentLoader();

export const encodeToQrCodeUrl = async (vp: any) => {
  const { imageDataUrl } = await vpqr.toQrCode({vp, documentLoader});

  return imageDataUrl;
};

export const encodeToVpUnsigned = (vc: any) => {
  return {
    "@context": W3C_CONTEXT_URL_2018_V1,
    "type": W3C_CONTEXT_VP_TYPE_2018_V1,
    "verifiableCredential": vc
  };
};
