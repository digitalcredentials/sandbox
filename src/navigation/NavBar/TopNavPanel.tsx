import React from "react";
import logo from "../../icons/DCC Logos (Public)/1x/DCC Logo-White Text on Transparent-896x278.png";

import {
  AppBar,
  Toolbar,
  Typography,
} from "@mui/material";

// Header bar
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
      {/* DCC Icon white on transparent */}
      <img src={logo} height="60rem"/>
      {/* Site title */}
      <Typography
        variant="h1"
        component="div"
        align="center"
        sx={{
          flexGrow: 1,
          ml: "-7%",
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
