import axios from 'axios';

interface SignedDocumentPostProps {
  source: string;
}

interface VerifyDocumentPostProps {
  source: string;
}

const instanse = axios.create({
  baseURL: 'https://sign-and-verify.herokuapp.com/',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export const SignedDocumentRequest = ({ source }: SignedDocumentPostProps) => {
  return instanse.post(`issue/credentials`, source);
};

export const VerifyDocumentRequest = ({ source }: VerifyDocumentPostProps) => {
  return instanse.post(`verify/credentials`, source);
};
