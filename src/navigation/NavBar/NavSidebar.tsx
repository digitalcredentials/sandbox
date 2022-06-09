import React from "react";
import styled from "styled-components";
import { NAV_SIZE, NAV_SIDEBAR_ICONS } from "../../utils/constants";
import COLORS from "../../utils/colors";
import { Link, useLocation } from "react-router-dom";

type PropsType = {
  handleDrawerOpen: () => void;
  handleDrawerClose: () => void;
  isOpen: boolean;
};

type StylePropsType = {
  isOpen?: boolean;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  top: ${NAV_SIZE.TOP_NAV_HEIGHT};
  left: 0;
  bottom: 0;
  padding-top: 55px;
  width: ${NAV_SIZE.SIDE_NAV_WIGHT};
  background-color: ${COLORS.ATLANTIS};
`;

const StyledLink = styled(Link)`
  color: #000 !important;
  text-decoration: none;
`;

// Left icon sizes
const SvgIcon = styled.span`
  color: ${COLORS.WHITE};
  display: block;
  font-size: 35px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.5s ease-in-out;
  &.active {
    color: ${COLORS.WHITE};
    border-radius: 20px;
    box-shadow: -10px 10px 20px rgba(174, 186, 25, 0.2),
      10px -10px 20px rgba(174, 186, 25, 0.2),
      -10px -10px 20px rgba(255, 255, 37, 0.9),
      10px 10px 25px rgba(174, 186, 25, 0.9);
  }
  &:hover {
    color: ${COLORS.BLUE_RIBBON};
  }
`;

const SvgContainer = styled.div`
  position: relative;
  margin-bottom: 50px;
`;

const SideArrow = styled.span`
  display: block;
  font-size: 20px;
  position: absolute;
  transform: rotate(180deg);
  right: 5px;
  top: 30px;
  color: ${COLORS.WHITE};
  pointer-events: none;
  opacity: ${({ isOpen }: StylePropsType) => (isOpen ? "0" : "0.9")};
  transition: all 0.3s ease-in-out;
`;

const NavSidebar = ({
  handleDrawerOpen,
  handleDrawerClose,
  isOpen,
}: PropsType) => {
  const currentUrl = useLocation().pathname;

  const sidebarTabHandle = (index: number) => {
    // if (currentUrl === "/" && index === 0) {
    //   handleDrawerOpen();
    // } else {
    //   handleDrawerClose();
    // }
  };

  return (
    <Container>
      {NAV_SIDEBAR_ICONS.map((item, index) => {
        return (
          <SvgContainer key={`NavSidebar-${item.icon}`}>
            {currentUrl === "/" && item.link === "/" && (
              <SideArrow className="icon-arrow" isOpen={isOpen} />
            )}
            <StyledLink to={item.link}>
              <SvgIcon
                className={
                  item.link === currentUrl ? `${item.icon} active` : item.icon
                }
                onClick={() => sidebarTabHandle(index)}
              />
            </StyledLink>
          </SvgContainer>
        );
      })}
    </Container>
  );
};

export default NavSidebar;
