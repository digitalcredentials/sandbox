import React, { useState } from "react";
import styled from "styled-components";
import { NAV_SIZE } from "../../utils/constants";
import COLORS from "../../utils/colors";
import { smallList } from "../../fixtures";

type PropsType = {
  setDocument: (document: any) => void;
  isOpen: boolean;
  handleDrawerClose: () => void;
};

type StylePropsType = {
  isOpen?: boolean;
};

const Container = styled.div`
  visibility: ${({ isOpen }: StylePropsType) => (isOpen ? "unset" : "hidden")};
  display: flex;
  position: absolute;
  z-index: 5;
  overflow: hidden;
  top: ${NAV_SIZE.TOP_NAV_HEIGHT};
  left: ${NAV_SIZE.SIDE_NAV_WIGHT};
  right: 0;
  bottom: 0;
  background: ${({ isOpen }: StylePropsType) =>
    isOpen ? "rgba(51, 51, 51, 0.7)" : "rgba(51, 51, 51, 0)"};
  transition: all 0.5s ease-in;
`;

const InfoModal = styled.div`
  position: relative;
  transform: ${({ isOpen }: StylePropsType) =>
    isOpen ? "translateX(0%);" : "translateX(-100%)"};
  width: 257px;
  height: 100%;
  padding: 30px;
  background-color: ${COLORS.BLUE_CHALK};
  transition: all 0.3s ease-in;
`;

const Title = styled.h3`
  margin: 0;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 32px;
`;

const Subtitle = styled.div`
  font-style: italic;
  font-weight: normal;
  font-size: 13px;
  line-height: 17px;
  color: rgba(51, 51, 51, 0.5);
`;

const MenuItemContainer = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 20px;
  padding-top: 25px;
`;

const MenuItem = styled.div`
  padding: 5px 0;
  margin-bottom: 20px;
  cursor: pointer;
  transition: all 0.5s ease-in-out;
  &.active {
    color: ${COLORS.DAISY_BUSH};
  }
  &:hover {
    color: ${COLORS.DAISY_BUSH};
  }
`;

const SvgIcon = styled.span`
  position: absolute;
  transform: ${({ isOpen }: StylePropsType) =>
    isOpen ? "rotate(0deg)" : "rotate(180deg)"};
  right: 10px;
  top: 15px;
  display: block;
  font-size: 20px;
  padding: 20px 25px;
  border-radius: 100%;
  cursor: pointer;
  transition: all 0.5s ease-in;
`;

const ClosingArea = styled.div`
  width: 100%;
  height: 100%;
`;

const Drawer = ({ setDocument, isOpen, handleDrawerClose }: PropsType) => {
  const [activeTab, setActiveTab] = useState(0);

  const updateSample = (index: number, document: any) => {
    setActiveTab(index);
    setDocument(document);
    handleDrawerClose();
  };
  return (
    <Container isOpen={isOpen}>
      <InfoModal isOpen={isOpen}>
        <SvgIcon
          className="icon-arrow"
          onClick={handleDrawerClose}
          isOpen={isOpen}
        />
        <Title>Design</Title>
        <Subtitle>Select a template</Subtitle>
        <MenuItemContainer>
          {smallList.map((item, index) => {
            return (
              <MenuItem
                key={item.name}
                className={index === activeTab ? "active" : ""}
                onClick={() => updateSample(index, item.document)}
              >
                {item.name}
              </MenuItem>
            );
          })}
        </MenuItemContainer>
      </InfoModal>
      <ClosingArea onClick={handleDrawerClose} />
    </Container>
  );
};

export default Drawer;
