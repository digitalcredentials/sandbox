export interface IssueParams {
	randomDid: boolean;
	didSeed: string;
	didMethod: string;
	serializationType: string;
	keySuite: string;
}

export function SignCredential(unsignedCredential: object, options: IssueParams)
{
	console.log(unsignedCredential);
	console.log(options);
	return {hello: "world"};
}

export function VerifyCredential(unVerifiedCredential: object)
{
	var expiration = Math.random() < 0.5;
	var valid_signature = Math.random() < 0.5;
	var issuer_did_resolves = Math.random() < 0.5;
	var revocation_status = Math.random() < 0.5;
	return [
		{id: "expiration", valid: expiration},
		{id: "valid_signature", valid: valid_signature},
		{id: "issuer_did_resolves", valid: issuer_did_resolves},
		{id: "revocation_status", valid: revocation_status},
	]
}