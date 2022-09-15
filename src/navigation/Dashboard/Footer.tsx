import React from "react";
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
        <Link
          target="_blank"
          rel="noreferrer"
          href="https://digitalcredentials.mit.edu/"
        >
          Digital Credentials Consortium
        </Link>
        {" • "}
        <Link
          href="https://openlearning.mit.edu/"
          target="_blank"
          rel="noreferrer"
        >
          MIT Open Learning
        </Link>
      </Typography>
      <Typography variant="body2" color="textSecondary" align="center">
        {/* TODO: Add link */}
        <Link
          target="_blank"
          rel="noreferrer"
        >
          Terms and Conditions of Use
        </Link>
        {" • "}
        {/* TODO: Add link */}
        <Link
          target="_blank"
          rel="noreferrer"
        >
          Privacy Policy
        </Link>
        {" • "}
        <Link
          href="https://accessibility.mit.edu/"
          target="_blank"
          rel="noreferrer"
        >
          Accessibility
        </Link>
        {" • "}
        <Link
          href="https://github.com/digitalcredentials/sandbox"
          target="_blank"
          rel="noreferrer"
        >
          View on Github
        </Link>
      </Typography>
    </Box>
  );
};

export default Footer;
