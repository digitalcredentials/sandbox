import axios from "axios";

const instance = axios.create({
  baseURL: "https://sign-and-verify.herokuapp.com/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const SignedDocumentRequest = (source: string) => {
  return instance.post(`issue/credentials`, source);
};

export const VerifyDocumentRequest = (source: string) => {
  return instance.post(`verify/credentials`, source);
};
