export const DccContextV1 = {
  "@context": {
    "@protected": true,
    "id": "@id",
    "type": "@type",
    "EducationalOccupationalCredential": "http://schema.org/EducationalOccupationalCredential",
    "EducationalOccupationalProgram": "http://schema.org/EducationalOccupationalProgram",
    "Course": "http://schema.org/Course",
    "CourseInstance": "http://schema.org/CourseInstance",
    "Person": "http://schema.org/Person",
    "name": "http://schema.org/name",
    "url": "http://schema.org/url",
    "identifier": "http://schema.org/identifier",
    "courseCode": "http://schema.org/courseCode",
    "numberOfCredits": "http://schema.org/numberOfCredits",
    "startDate": "http://schema.org/startDate",
    "endDate": "http://schema.org/endDate",
    "value": "http://schema.org/value",
    "educationalCredentialAwarded": "http://schema.org/educationalCredentialAwarded",
    "hasCourseInstance": "http://schema.org/hasCourseInstance",
    "description": {
      "@id": "http://schema.org/description"
    },
    "image": {
      "@id": "http://schema.org/image",
      "@type": "@id"
    },
    "awardedOnCompletionOf": {
      "@reverse": "http://schema.org/educationalCredentialAwarded"
    },
    "competencyRequired": "http://schema.org/EducationalOccupationalCredential#competencyRequired",
    "credentialCategory": "http://schema.org/EducationalOccupationalCredential#credentialCategory",
    "hasCredential": "http://schema.org/hasCredential",
    "assertion": "https://w3id.org/dcc/v1#assertion",
    "Issuer": "https://w3id.org/openbadges#Issuer",
    "ProgramCompletionCredential": "https://w3id.org/dcc/v1#ProgramCompletionCredential",
    "CourseCompletionCredential": "https://w3id.org/dcc/v1#CourseCompletionCredential",
    "LearningCredential": "https://w3id.org/dcc/v1#LearningCredential",
    "Assertion": "https://w3id.org/dcc/v1#Assertion"
  }
};

