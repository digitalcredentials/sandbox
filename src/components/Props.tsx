//TODO: Add props for IssueForm
import { HTMLAttributes } from "react";

export interface DocProps extends HTMLAttributes<HTMLDivElement> {
  document: any;
  setDocument: (document: any) => void;
}

export interface SigningProps extends HTMLAttributes<HTMLDivElement> {
  document: string;
  setDocument: (document: any) => void;
  signedDocument: any;
  setSignedDocument: (signedDocument: any) => void;
}

export interface VerificationProps extends HTMLAttributes<HTMLDivElement> {
  signedDocument: any;
  setSignedDocument: (signedDocument: any) => void;
  verificationResult: any;
  setVerificationResult: (verificationResult: any) => void;
}

export interface RequestProps extends HTMLAttributes<HTMLDivElement> {
  subjectDid: string;
  setSubjectDid: (subjectDid: string) => void;
  demoCredential: any;
  setDemoCredential: (demoCredential: any) => void;
}

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  size: number;
}