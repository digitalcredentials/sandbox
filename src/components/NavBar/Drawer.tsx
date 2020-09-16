import React, { useState } from "react";
import styled from "styled-components";
import { NAV_SIZE, TOP_NAV_PANEL_ICONS } from "../../utils/constants";
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
  display: ${({ isOpen }: StylePropsType) => (isOpen ? "unset" : "none")};
  position: absolute;
  z-index: 5;
  overflow: hidden;
  top: ${NAV_SIZE.TOP_NAV_HEIGHT};
  left: ${NAV_SIZE.SIDE_NAV_WIGHT};
  right: 0;
  bottom: 0;
  background: rgba(51, 51, 51, 0.7);
`;

const InfoModal = styled.div`
  position: relative;
  width: 257px;
  height: 100%;
  padding: 30px;
  background-color: ${COLORS.BLUE_CHALK};
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
  right: 10px;
  top: 15px;
  display: block;
  font-size: 20px;
  padding: 20px 25px;
  border-radius: 100%;
  cursor: pointer;
`;

const Drawer = ({ setDocument, isOpen, handleDrawerClose }: PropsType) => {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <Container isOpen={isOpen}>
      <InfoModal>
        <SvgIcon className="icon-arrow" onClick={handleDrawerClose} />
        <Title>Design</Title>
        <Subtitle>Select a template</Subtitle>
        <MenuItemContainer>
          {smallList.map((item, index) => {
            const updateSample = () => {
              setActiveTab(index);
              setDocument(item.document);
            };
            return (
              <MenuItem
                key={item.name}
                className={index === activeTab ? "active" : ""}
                onClick={updateSample}
              >
                {item.name}
              </MenuItem>
            );
          })}
        </MenuItemContainer>
      </InfoModal>
    </Container>
  );
};

export default Drawer;
