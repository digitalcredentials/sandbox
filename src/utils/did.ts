import { createIssuer, createVerifier, DIDDocument } from '@digitalcredentials/sign-and-verify-core';
import { driver as didKeyDriver } from '@digitalcredentials/did-method-key';

const privatizeDidDoc = (didDocument: DIDDocument, getMethodForPurpose: Function) => {
    const didDocumentClone = JSON.parse(JSON.stringify(didDocument));
    const purposes = [
      'authentication',
      'assertionMethod',
      'verificationMethod',
      'capabilityDelegation',
      'capabilityInvocation',
      'keyAgreement'
    ];
    purposes.forEach((purpose) => {
      const methodForPurpose = getMethodForPurpose({ purpose });
      didDocumentClone[purpose][0] = JSON.parse(JSON.stringify(methodForPurpose));
    });
    return didDocumentClone;
  };

export const getDidDocFromSeed = async (seed: string) => {
  const didSeedBytes = (new TextEncoder()).encode(seed).slice(0, 32);
  const { didDocument, methodFor } = await didKeyDriver.generate({ seed: didSeedBytes });
  const publicDoc: DIDDocument = JSON.parse(JSON.stringify(didDocument));
  const privateDoc: DIDDocument = privatizeDidDoc(didDocument, methodFor);

  return {publicDoc, privateDoc};
};
