import degree from './samples/degree.json';
import openBadge from './samples/openBadge.json';
import openSkillsAssertion from './samples/openSkillsAssertion.json';
import didDoc from './samples/didDoc.json';

export const smallList = [
  {
    name: 'Open Badge',
    document: openBadge
  },
  {
    name: 'Degree',
    document: degree
  },
  {
    name: 'Open Skills Assertion',
    document: openSkillsAssertion
  }
];

export const didDocument = didDoc;
export const signingPrivateKey = {
  "kid": "",
  "kty": "",
  "crv": "",
  "x": "",
  "d": ""
};