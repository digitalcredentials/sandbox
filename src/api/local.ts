// import { Ed25519Signature2020 } from '@digitalcredentials/ed25519-signature-2020';
// import { securityLoader } from '@digitalcredentials/security-document-loader';
// import vc from '@digitalcredentials/vc';
// import * as didKey from '@digitalcredentials/did-method-key';
// import { generateId } from '@digitalcredentials/bnid'
//

// const documentLoader = securityLoader().build()
// import { Ed25519Signer } from '@did.coop/did-key-ed25519'

import { Ed25519VerificationKey2020 } from '@digitalcredentials/ed25519-verification-key-2020'

export interface IssueParams {
  credential: any;
  randomDid: boolean;
  didSeed: string;
  didMethod: string;
  serializationType: string;
  keySuite: string;
}

export async function signCredential ({
  credential, randomDid, didSeed, didMethod, serializationType, keySuite
}: IssueParams) {

  const edKeyPair = await Ed25519VerificationKey2020.generate()
  console.log(edKeyPair)

  // const driver = didKey.driver()

  // const secretKeySeedBytes = await generateId();
  //
  // const {didDocument, methodFor} = await driver.generate({
  //   seed: secretKeySeedBytes
  // });
  // credential.issuer.id = didDocument.id;
  //
  // const signingKeyPair = methodFor({purpose: 'assertionMethod'})
  //
  // const suite = new Ed25519Signature2020({key: signingKeyPair});
  // return vc.issue({ credential, suite, documentLoader });
  // const signer = await Ed25519Signer.generate()
  // console.log(signer)
}

export function verifyCredential (unVerifiedCredential: object) {
  return [
    { id: "expiration", valid: Math.random() < 0.5 },
    { id: "valid_signature", valid: Math.random() < 0.5 },
    { id: "issuer_did_resolves", valid: Math.random() < 0.5 },
    { id: "revocation_status", valid: Math.random() < 0.5 }
  ]
}
