// Component of VerificationResultsCard displaying a single verification check item
import {
  Grid,
  Typography,
 } from '@mui/material'
import React from 'react'
import {FC, useState} from 'react'
import { VerificationCheckProps } from './Props'
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';


export const VerificationCheck: FC<VerificationCheckProps> = ({
  valid,
  message,
}) => {
  return (
    <Grid
      container
      spacing={2}
    >

      {/* Display check or X */}
      <Grid item xs={2} sm={1.5}>
        {valid &&
          <CheckIcon
            sx={{
              color:"green",
            }}
          />
        }
        {!valid &&
          <ClearIcon
            sx={{
              color:"red",
            }}
          />
        }
      </Grid>
      {/* Display message */}
      <Grid
        item
        xs={10} sm={10.5}
      >
        <Typography variant="h4">{message}</Typography>
      </Grid>
    </Grid>
  )
}
