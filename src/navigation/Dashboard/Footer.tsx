import React from "react";
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Divider,
  Link,
  Typography,
} from "@mui/material";

const Footer = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      sx={{
        flexDirection: "column",
        gap: "7px",
        mt: "5px",
        mb: "30px",
        width: {
          md: "70%",
          lg: "50%",
        },
        ml: {
          md: "15%",
          lg: "25%",
        },
      }}
    >
      {/* Horizontal line to break content before footer */}
      <Divider
        orientation="horizontal"
        sx={{
          mb: "20px",
          width: "80%",
        }}
      />
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        {new Date().getFullYear()}
        {" Massachusetts Institute of Technology"}
      </Typography>
      <Typography variant="body2" color="textSecondary" align="center">
        <a
          target="_blank"
          rel="noreferrer"
          href="https://digitalcredentials.mit.edu/"
        >
          Digital Credentials Consortium
        </a>
        {" • "}
        <a
          href="https://openlearning.mit.edu/"
          target="_blank"
          rel="noreferrer"
        >
          MIT Open Learning
        </a>
        {" • "}
        <RouterLink
          to="/terms"
        >
          Terms and Conditions of Use
        </RouterLink>
        {" • "}
        <RouterLink
          to="/privacy"
        >
          Privacy Policy
        </RouterLink>
        {" • "}
        <a
          href="https://accessibility.mit.edu/"
          target="_blank"
          rel="noreferrer"
        >
          Accessibility
        </a>
        {" • "}
        <a
          href="https://github.com/digitalcredentials/sandbox"
          target="_blank"
          rel="noreferrer"
        >
          View on Github
        </a>
      </Typography>
    </Box>
  );
};

export default Footer;
