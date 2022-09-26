import React from "react";
import { Link, useLocation } from "react-router-dom";

import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import HelpIcon from '@mui/icons-material/Help';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';

const NavTabs = () => {
  const currentUrl = useLocation().pathname;

  return (
    <Tabs
      variant="fullWidth"
      value={currentUrl}
      centered
      //TODO: increase font size of labels
      //TODO: reference constants for sizes!!!
      sx={{
        position: "sticky",
        top: "0px",
        backgroundColor: "white",
        zIndex: 9999,
        boxShadow: "0px 5px 10px -10px black",
        pt: "5px",
      }}
    >
      <Tab
        label={<div>
            <HistoryEduIcon fontSize="large"
            style = {{
              verticalAlign : 'middle',
              marginRight: "15px",
            }}/>
            Verify
          </div>}
        value="/"
        component={Link}
        to="/"
        key={0}
      />
      <Tab
        label={<div>
              <PublishedWithChangesIcon fontSize="large"
              style = {{
                verticalAlign : 'middle',
                marginRight: "15px",
              }}/>
              Verify
            </div>}
        value="/verify"
        component={Link}
        to="/verify"
        key={1}
      />
      {/* <Tab
        label="About"
        value="/about"
        component={Link}
        to="/about"
        key={2}
        icon={<HelpIcon fontSize="large"/>}
      /> */}
    </Tabs>
  );
};

export default NavTabs;
