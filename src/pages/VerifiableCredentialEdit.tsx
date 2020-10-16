import React, { FC, useCallback, useState } from "react";
import { JSONEditor, LinkedDataPropertyTable, CredentialCard } from "@material-did/common";
import { DocProps } from "../components/Props";
import styled from "styled-components";
import COLORS from "../utils/colors";
import { Tabs } from "../components";

const Container = styled.div`
  font-family: Source Code Pro;
`;

const ContentContainer = styled.div`
  border-radius: 20px;
  background-color: ${COLORS.DAISY_BUSH};
  padding: 40px 60px;
`;

const MainContent = styled.div`
  overflow: hidden;
  border-radius: 20px;
`;

const InfoMessage = styled.div`
  background-color: ${COLORS.WHITE};
  padding: 15px;
`;

export const VerifiableCredentialEdit: FC<DocProps> = ({
  document,
  setDocument,
}) => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabSelect = useCallback(
    (newValue: number) => {
      setTabIndex(newValue);
    },
    [setTabIndex]
  );

  const editorOnChange = (data: string) => {
    try {
      setDocument(JSON.parse(data));
    } catch (error) {}
  };

  const contentComponentsArr = [
    <JSONEditor
      value={JSON.stringify(document, null, 2)}
      onChange={editorOnChange}
    />,
    <LinkedDataPropertyTable document={document} />,
    <CredentialCard verifiableCredential={document} />,
    <InfoMessage>QR code is coming soon!</InfoMessage>,
  ];

  return (
    <Container>
      <ContentContainer>
        <Tabs handleTabSelect={handleTabSelect} tabIndex={tabIndex} />
        <MainContent>{contentComponentsArr[tabIndex]}</MainContent>
      </ContentContainer>
    </Container>
  );
};
