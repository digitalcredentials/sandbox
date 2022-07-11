import React from "react";
import styled from "styled-components";
import { NAV_SIZE, NAV_SIDEBAR_ICONS } from "../../utils/constants";
import COLORS from "../../utils/colors";
import { Link, useLocation } from "react-router-dom";

import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

const NavTabs = () => {
  const currentUrl = useLocation().pathname;

  return (
    <Tabs
      variant="fullWidth"
      value={currentUrl}
      centered
      //TODO: reference constants!!!
      sx={{mt: "105px"}}
    >
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
