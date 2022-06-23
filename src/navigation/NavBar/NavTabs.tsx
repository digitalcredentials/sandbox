import React from "react";
import styled from "styled-components";
import { NAV_SIZE, NAV_SIDEBAR_ICONS } from "../../utils/constants";
import COLORS from "../../utils/colors";
import { Link, useLocation } from "react-router-dom";

import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";

const NavTabs = () => {
  const currentUrl = useLocation().pathname;

  return (
    <Tabs variant="fullWidth" value={currentUrl} centered>
      {NAV_SIDEBAR_ICONS.map((item, index) => {
        return (
          <Tab
            label={item.label}
            value={item.link}
            component={Link}
            to={item.link}
            key={index}
          />
        );
      })}
    </Tabs>
  );
};

export default NavTabs;
