export interface IssueParams {
  randomDid: boolean;
  didSeed: string;
  didMethod: string;
  serializationType: string;
  keySuite: string;
}

export function signCredential (unsignedCredential: object, options: IssueParams) {
  return unsignedCredential;
}

export function verifyCredential (unVerifiedCredential: object) {
  return [
    {id: "expiration", valid: Math.random() < 0.5},
    {id: "valid_signature", valid: Math.random() < 0.5},
    {id: "issuer_did_resolves", valid: Math.random() < 0.5},
    {id: "revocation_status", valid: Math.random() < 0.5},
  ]
}
