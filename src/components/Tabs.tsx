import React from "react";
import styled from "styled-components";
import COLORS from "../utils/colors";
import { MAIN_PAGE_TABS } from "../utils/constants";
import { BUTTON_BOX_SHADOW, BUTTON_INSET_BOX_SHADOW } from "../utils/constants";

type PropsType = {
  tabIndex: number;
  handleTabSelect: (newValue: number) => void;
};

const TabsContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Tab = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  color: ${COLORS.WHITE};
  background-color: ${COLORS.DAISY_BUSH};
  padding: 18px 0;
  border-radius: 15px;
  margin-right: 5%;
  cursor: pointer;
  ${BUTTON_BOX_SHADOW}
  transition: all 0.5s ease-in-out;
  &:last-child {
    margin-right: 0;
  }
  &:hover {
    ${BUTTON_INSET_BOX_SHADOW}
  }
  &.active {
    ${BUTTON_INSET_BOX_SHADOW}
  }
`;

const TabText = styled.span`
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 20px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

export const Tabs = ({ tabIndex, handleTabSelect }: PropsType) => {
  return (
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
  );
};
