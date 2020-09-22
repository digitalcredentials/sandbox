import React from 'react';
import styled from 'styled-components';
import { NAV_SIZE, TOP_NAV_PANEL_ICONS } from '../../utils/constants';
import COLORS from '../../utils/colors';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: ${NAV_SIZE.TOP_NAV_HEIGHT};
  z-index: 9;
  color: ${COLORS.WHITE};
  background-color: ${COLORS.METEORITE};
`;

const TopNavLeftSide = styled.div`
  display: flex;
  align-items: center;
`;

const TopNavRightSide = styled(TopNavLeftSide)``;

const SvgIcon = styled.span`
  display: block;
  font-size: 40px;
  cursor: pointer;
  &.active {
    color: ${COLORS.LAVENDER_PINK};
  }
`;

const OpenMenuContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${NAV_SIZE.SIDE_NAV_WIGHT};
  height: 100%;
  color: ${COLORS.LAVENDER_PINK};
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
    <Container>
      <TopNavLeftSide>
        <OpenMenuContainer>
          <SvgIcon className="icon-open-menu" style={{ padding: '10px' }} />
        </OpenMenuContainer>
        <NavTitle>DCC Credebtial Playground</NavTitle>
      </TopNavLeftSide>
      <TopNavRightSide>
        {TOP_NAV_PANEL_ICONS.map(item => (
          <SvgIcon
            key={`TopNavPanel-${item}`}
            className={item}
            style={{ paddingRight: '50px' }}
          />
        ))}
      </TopNavRightSide>
    </Container>
  );
};

export default TopNavPanel;
