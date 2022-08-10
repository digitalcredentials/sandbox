import React from "react";
import logo from "../../icons/DCC Logos (Public)/1x/DCC Logo-White Text on Transparent-896x278.png";

import {
  AppBar,
  Box,
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
      
      {/* DCC Icon, white on transparent */}
      <Box
        component="img"
        sx={{
          height: {
            sm: "45px",
            md: "60px",
          },
          display: {
            xs: "none",
            sm: "block",
          },
        }} 
        src={logo}
      />

      {/* Site title */}
      <Typography
        variant="h1"
        component="div"
        align="center"
        sx={{
          flexGrow: 1,
          mr: {
            xs: "0",
            sm: "7%",
          },
        }}
      >
        DCC Developer Sandbox
      </Typography>
      
      </Toolbar>
    </AppBar>
  );
};

export default TopNavPanel;
