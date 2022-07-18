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
	return {data: "hello world"};
}