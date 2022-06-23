import React from "react";
import styled from "styled-components";
import { NAV_SIZE, TOP_NAV_PANEL_ICONS } from "../../utils/constants";
import COLORS from "../../utils/colors";

import {Tab, Tabs, Link} from "@material-ui/core";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: ${NAV_SIZE.TOP_NAV_HEIGHT};
  z-index: 9;
  color: ${COLORS.WHITE};
  background-color: ${COLORS.DAISY_BUSH};
`;

const ToggleBar = styled.div`
  position: fixed;
  top:${NAV_SIZE.TOP_NAV_HEIGHT};
  left:0;
  justify-content: center;
  background-color: ${COLORS.WHITE};
  width: 100%;
  z-index: 100;
`;

const TopNavLeftSide = styled.div`
  display: flex;
  align-items: center;
`;

// const TopNavRightSide = styled(TopNavLeftSide)``;

const SvgIcon = styled.span`
  display: block;
  font-size: 40px;
  color: ${COLORS.ATLANTIS};
  filter: drop-shadow(0px 4px 4px rgba(1, 1, 1, 0.4));
  &.active {
    color: ${COLORS.BLUE_RIBBON};
  }
`;

const OpenMenuContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${NAV_SIZE.SIDE_NAV_WIGHT};
  height: 100%;
  color: ${COLORS.BLUE_RIBBON};
`;

const NavTitle = styled.h1`
  margin: 0;
  font-style: normal;
  font-weight: 600;
  font-size: 30px;
  line-height: 40px;
`;

const TopNavPanel = () => {
  return (
    <div>
    <Container>
      <TopNavLeftSide>
        <OpenMenuContainer>
          <SvgIcon className="icon-open-menu" style={{ padding: "10px" }} />
        </OpenMenuContainer>
        <NavTitle>DCC Developer Sandbox</NavTitle>
      </TopNavLeftSide>
      {/*
      <TopNavRightSide>
        {TOP_NAV_PANEL_ICONS.map((item) => (
          <SvgIcon
            key={`TopNavPanel-${item}`}
            className={item}
            style={{ paddingRight: "50px" }}
          />
        ))}
      </TopNavRightSide> */}
      
    </Container>
    </div>
  );
};

export default TopNavPanel;
