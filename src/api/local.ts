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