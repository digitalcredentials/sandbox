import React from "react";
import styled from "styled-components";
import COLORS from "../utils/colors";
import { MAIN_PAGE_TABS } from "../utils/constants";

type PropsType = {
  tabIndex: number;
  handleTabSelect: (newValue: number) => void;
};

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
