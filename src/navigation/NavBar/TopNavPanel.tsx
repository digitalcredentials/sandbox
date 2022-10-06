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
        pt: "-30px",
        pb: "0rem",
      }}
    >
      <Toolbar>
      
      {/* DCC Icon, white on transparent */}
      <a
        href="https://digitalcredentials.mit.edu/"
        target="_blank"
      >
        <Box
          component="img"
          sx={{
            height: {
              xs: "30px",
              sm: "30px",
              md: "45px",
            },
            display: {
              xxs: "none",
              sm: "block",
            },
          }} 
          src={logo}
        />
      </a>

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
        Developer Sandbox
      </Typography>
      
      </Toolbar>
    </AppBar>
  );
};

export default TopNavPanel;
