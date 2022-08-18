import React from "react";
import {
  Box,
  Button,
  Grid,
  Typography,
} from "@mui/material";
import { HelpEntryProps } from './Props';
import {FC} from 'react';
import { Link } from 'react-router-dom';

export const HelpEntry: FC<HelpEntryProps> = ({
  title,
  body,
  pageLink,
}) => 
{

  return (
    <Box
      sx={{
        mt: "1.25rem",
      }}
    >
      <Box
        display="flex"
        sx={{
          alignItems: "center",
          mb: "0.3rem",
        }}
      >
        <Typography
          variant="h2"
          id="anchor"
        >
          {title}
        </Typography>

        {pageLink && pageLink.length > 0 &&
          <Button
            color="info"
            variant="contained"
            component={Link}
            to={pageLink}
            size="small"
            sx={{
              ml: "2rem",
            }}
          >
            Go to instance
          </Button>
        }
      </Box>

      <Typography variant="body1">
        {body}
      </Typography>
    </Box>
  )
}