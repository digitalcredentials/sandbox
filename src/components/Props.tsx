//TODO: Add props for IssueForm
import { HTMLAttributes } from 'react';

export interface DocProps extends HTMLAttributes<HTMLDivElement> {
  document: any;
  setDocument: (document: any) => void;
}

export interface SigningProps extends HTMLAttributes<HTMLDivElement> {
  unsignedDocument: string;
  setDocument: (document: string) => void;
  signedDocument: any;
  setSignedDocument: (signedDocument: any) => void;
  qrCodeUrls: string[];
  setQrCodeUrls: (document: string[]) => void;
}

export interface VerificationProps extends HTMLAttributes<HTMLDivElement> {
  unverifiedDocument: string;
  setUnverifiedDocument: (signedDocument: string) => void;
  verificationResult: any;
  setVerificationResult: (verificationResult: any) => void;
}

//TODO: make props type for verification results more strict
export interface VerificationResultsProps extends HTMLAttributes<HTMLDivElement> {
  results: any;
  error: Error | undefined;
}

export interface VerificationCheckProps extends HTMLAttributes<HTMLDivElement> {
  valid: boolean;
  message: string;
}

export interface RequestProps extends HTMLAttributes<HTMLDivElement> {
  subjectDid: string;
  setSubjectDid: (subjectDid: string) => void;
  demoCredential: any;
  setDemoCredential: (demoCredential: any) => void;
}

export interface HelpEntryProps extends HTMLAttributes<HTMLDivElement> {
  id: string;
  title: string;
  body: string;
  pageLink: string;
}

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  size: number;
}
