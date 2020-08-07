import React, { FC, HTMLAttributes } from 'react';

export interface DocProps extends HTMLAttributes<HTMLDivElement> {
  document: any;
  setDocument: (document:any) => void;
}

export interface SigningProps extends HTMLAttributes<HTMLDivElement> {
  document: any;
  setDocument: (document:any) => void;
  signedDocument: any;
  setSignedDocument: (signedDocument:any) => void;
}

export interface VerificationProps extends HTMLAttributes<HTMLDivElement> {
  signedDocument: any;
  setSignedDocument: (signedDocument:any) => void;
  verificationResult: any;
  setVerificationResult: (verificationResult:any) => void;
}

