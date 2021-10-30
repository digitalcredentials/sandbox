import { contexts as ldContexts, documentLoaderFactory } from '@transmute/jsonld-document-loader';
// TODO: The DCC fork of vpq is not working at the moment
// import * as vpqr from '@digitalcredentials/vpqr';
import * as vpqr from '@digitalbazaar/vpqr';

const didContext = require('@digitalcredentials/did-context');
const ed25519 = require('ed25519-signature-2020-context');
const DccContextV1Url = "https://w3id.org/dcc/v1";
import { DccContextV1 } from "./contexts";

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
  .addContext({ [DccContextV1Url]: DccContextV1 })
  return customLoaderProto;
};

const customLoaderProto = getCustomLoader();
const documentLoader = customLoaderProto.buildDocumentLoader();

export const encodeToQrCodeUrl = async (vp: any) => {
  const { imageDataUrl } = await vpqr.toQrCode({vp, documentLoader});
  return imageDataUrl;
};

