import React, { useState } from "react";
import styled from "styled-components";
import { NAV_SIZE, NAV_SIDEBAR_ICONS } from "../../utils/constants";
import COLORS from "../../utils/colors";
import { Link } from "react-router-dom";

type PropsType = {
  handleDrawerOpen: () => void;
  handleDrawerClose: () => void;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: ${NAV_SIZE.TOP_NAV_HEIGHT};
  left: 0;
  bottom: 0;
  padding-top: 55px;
  width: ${NAV_SIZE.SIDE_NAV_WIGHT};
  background-color: ${COLORS.CORNFLOWER_BLUE};
`;

const StyledLink = styled(Link)`
  color: #000 !important;
  text-decoration: none;
`;

const SvgIcon = styled.span`
  color: ${COLORS.WHITE};
  display: block;
  font-size: 40px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.5s ease-in-out;
  &.active {
    color: ${COLORS.LAVENDER_PINK};
    border-radius: 20px;
    box-shadow: -10px 10px 20px rgba(106, 84, 190, 0.2),
      10px -10px 20px rgba(106, 84, 190, 0.2),
      -10px -10px 20px rgba(158, 126, 255, 0.9),
      10px 10px 25px rgba(106, 84, 190, 0.9);
  }
  &:hover {
    color: ${COLORS.LAVENDER_PINK};
  }
`;

const SvgContainer = styled.div`
  margin-bottom: 50px;
`;

const NavSidebar = ({ handleDrawerOpen, handleDrawerClose }: PropsType) => {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <Container>
      {NAV_SIDEBAR_ICONS.map((item, index) => {
        const sidebarTabHandle = () => {
          if (activeTab === 0 && index === 0) {
            handleDrawerOpen();
          } else {
            handleDrawerClose();
            setActiveTab(index);
          }
        };
        return (
          <SvgContainer key={`NavSidebar-${item.icon}`}>
            <StyledLink to={item.link}>
              <SvgIcon
                className={
                  index === activeTab ? `${item.icon} active` : item.icon
                }
                onClick={sidebarTabHandle}
              />
            </StyledLink>
          </SvgContainer>
        );
      })}
    </Container>
  );
};

export default NavSidebar;
