import { JSONEditor, LinkedDataPropertyTable } from "@material-did/common";
import React, { FC, useState } from "react";
import { DocProps } from "../Props";
import styled from "styled-components";
import COLORS from "../../utils/colors";
import { MAIN_PAGE_TABS } from "../../utils/constants";

const Container = styled.div`
  font-family: Source Code Pro;
`;

const ContentContainer = styled.div`
  border-radius: 20px;
  background-color: ${COLORS.METEORITE};
  padding: 40px 70px;
`;

const TabsContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
  margin-bottom: 60px;
`;

const Tab = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  color: ${COLORS.CORNFLOWER_BLUE};
  background-color: ${COLORS.WHITE};
  padding: 21px 0;
  border-radius: 20px;
  margin-right: 5%;
  cursor: pointer;
  transition: all 0.5s ease-in-out;
  &:last-child {
    margin-right: 0;
  }
  &:hover {
    color: ${COLORS.LAVENDER_PINK};
  }
  &.active {
    color: ${COLORS.LAVENDER_PINK};
    background-color: ${COLORS.CORNFLOWER_BLUE};
  }
`;

const TabText = styled.span`
  font-style: normal;
  font-weight: 600;
  font-size: 22px;
  line-height: 28px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
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

  const handleTabSelect = (newValue: number) => {
    setTabIndex(newValue);
  };

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
    <InfoMessage>CredentialCard is coming soon!</InfoMessage>,
    <InfoMessage>QR code is coming soon!</InfoMessage>,
  ];

  return (
    <Container>
      <ContentContainer>
        <TabsContainer>
          {MAIN_PAGE_TABS.map((item, index) => (
            <Tab
              key={item}
              className={index === tabIndex ? "active" : ""}
              onClick={() => handleTabSelect(index)}
            >
              <TabText>{item}</TabText>
            </Tab>
          ))}
        </TabsContainer>
        <MainContent>{contentComponentsArr[tabIndex]}</MainContent>
      </ContentContainer>
    </Container>
  );
};
