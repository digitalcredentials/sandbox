import React from "react";
import logo from "../../icons/DCC Logos (Public)/1x/DCC Logo-White Text on Transparent-896x278.png";

import {
  AppBar,
  Toolbar,
  Typography,
} from "@mui/material";

const TopNavPanel = () => {
  return (
    <AppBar
      position="static"
      sx={{
        pt: "1rem",
        pb: "1rem",
      }}
    >
      <Toolbar>
      <img src={logo} height="60rem"/>
      <Typography
        variant="h1"
        component="div"
        align="center"
        sx={{
          flexGrow: 1,
          ml: "-5rem",
          mb: "-1rem",
        }}
      >
        DCC Developer Sandbox
      </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default TopNavPanel;
