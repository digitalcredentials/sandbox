import { Ed25519Signature2020 } from '@digitalcredentials/ed25519-signature-2020';
import { securityLoader } from '@digitalcredentials/security-document-loader';
import vc from '@digitalcredentials/vc';
import * as didKey from '@digitalcredentials/did-method-key';
import {decodeSecretKeySeed} from '@digitalcredentials/bnid';

const driver = didKey.driver()
const documentLoader = securityLoader().build()

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
  const secretKeySeedBytes = didSeed ? decodeSecretKeySeed({secretKeySeed: didSeed}) : null

  const {didDocument, methodFor} = await driver.generate({
    seed: secretKeySeedBytes
  });
  credential.issuer.id = didDocument.id;

  const signingKeyPair = methodFor({purpose: 'assertionMethod'})

  const suite = new Ed25519Signature2020({key: signingKeyPair});
  return vc.issue({ credential, suite, documentLoader });
}

export function verifyCredential (unVerifiedCredential: object) {
  return [
    { id: "expiration", valid: Math.random() < 0.5 },
    { id: "valid_signature", valid: Math.random() < 0.5 },
    { id: "issuer_did_resolves", valid: Math.random() < 0.5 },
    { id: "revocation_status", valid: Math.random() < 0.5 }
  ]
}
