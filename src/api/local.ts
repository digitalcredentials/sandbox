export interface IssueParams {
	randomDid: boolean;
	didSeed: string;
	didMethod: string;
	serializationType: string;
	keySuite: string;
}

export function signCredential (unsignedCredential: object, options: IssueParams) {
	return {
		"@context": "https://www.w3.org/2018/credentials/v1",
		"type": "VerifiablePresentation",
		"verifiableCredential": {
		  "@context": [
			"https://www.w3.org/2018/credentials/v1",
			"https://w3id.org/security/suites/ed25519-2020/v1",
			"https://w3id.org/dcc/v1"
		  ],
		  "id": "https://cred.127.0.0.1.nip.io/api/issuance/12",
		  "type": [
			"VerifiableCredential",
			"Assertion"
		  ],
		  "issuer": {
			"id": "did:key:z6Mktpn6cXks1PBKLMgZH2VaahvCtBMF6K8eCa7HzrnuYLZv",
			"name": "Example University",
			"image": "https://user-images.githubusercontent.com/947005/133544904-29d6139d-2e7b-4fe2-b6e9-7d1022bb6a45.png"
		  },
		  "issuanceDate": "2021-09-06T00:00:00.000Z",
		  "credentialSubject": {
			"id": "did:example:abc123",
			"name": "Ian Malcom",
			"hasCredential": {
			  "id": "https://cred.127.0.0.1.nip.io/api/claim/9c38ea72-b791-4510-9f01-9b91bab8c748",
			  "name": "GT Guide",
			  "type": [
				"EducationalOccupationalCredential"
			  ],
			  "description": "The holder of this credential is qualified to lead new student orientations.",
			  "competencyRequired": "Demonstrated knowledge of key campus locations, campus services, and student organizations.",
			  "credentialCategory": "badge"
			}
		  },
		  "proof": {
			"type": "Ed25519Signature2020",
			"created": "2021-09-16T03:02:08Z",
			"verificationMethod": "did:key:z6Mktpn6cXks1PBKLMgZH2VaahvCtBMF6K8eCa7HzrnuYLZv#z6Mktpn6cXks1PBKLMgZH2VaahvCtBMF6K8eCa7HzrnuYLZv",
			"proofPurpose": "assertionMethod",
			"proofValue": "z4R9GDmWuFCTceHWAwKrNEqJP5D1Ay1TAANgehjCje7FgqqmTyckUu19bChDtLWjbvhVDK9YqJi2y36ETNK8SYDGf"
		  }
		}
	  };
}

export function verifyCredential (unVerifiedCredential: object) {
	return [
		{id: "expiration", valid: Math.random() < 0.5},
		{id: "valid_signature", valid: Math.random() < 0.5},
		{id: "issuer_did_resolves", valid: Math.random() < 0.5},
		{id: "revocation_status", valid: Math.random() < 0.5},
	]
}
