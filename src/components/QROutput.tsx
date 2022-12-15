import {
  Alert,
  BottomNavigation,
  BottomNavigationAction,
  Button,
  Box,
  Grid,
  IconButton,
  Snackbar,
  ToggleButton,
  Tooltip,
  ToggleButtonGroup,
  Typography,
 } from '@mui/material'
import { unstable_getThemeValue } from '@mui/system'
import { useState } from 'react'
import React from 'react'
import DownloadIcon from '@mui/icons-material/Download';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

type PropsType = {
  rawQrCodeUrl: string;
  compressedQrCodeUrl: string;
};

export const QROutput = ({rawQrCodeUrl, compressedQrCodeUrl}: PropsType) => {
  const [qrTab, setQrTab] = useState(0)
  
  const rawQrMsg = new Blob([rawQrCodeUrl]).size.toString() + " bytes raw JSON";
  const compressedQrMsg = new Blob([compressedQrCodeUrl]).size.toString() + " bytes compressed JSON";

  // Update QR output tab on click
  const qrTabChange = (event: React.SyntheticEvent, newValue: number) => {
    if (newValue !== null){
      setQrTab(newValue);
    }
  };

  return (
    <Box
    display="flex"
    flexDirection="column"
    alignItems="center"
    >
    
      {/* QR display */}
      <Box
      component="img"
      sx={{
        // maxHeightt: 350,
        maxWidth: 400,
        width: "100%",
        marginTop: {
          xl: "25px",
          sm: "10px",
        }
      }}
      alt="Compressed QR code."
      src={qrTab==0 ? rawQrCodeUrl : compressedQrCodeUrl}
      />
      
      {/* Message displaying size of QR code */}
      <Typography
      >
        {qrTab == 0 &&
          rawQrMsg}
        {qrTab == 1 &&
          compressedQrMsg}
      </Typography>

      <Box display="flex" alignItems="flex-start"
      sx={{
        marginLeft: "40px"
      }}
      >
        {/* Toggle to switch between QR encoding options */}
        <ToggleButtonGroup
        value={qrTab}
        onChange={qrTabChange}
        exclusive
        sx={{
          marginTop: "15px",
        }}
        >
          <ToggleButton
          disabled={rawQrCodeUrl == ""}
          value={0}
          >
            Raw
          </ToggleButton>
          
          <ToggleButton
          value={1}
          >
            Compressed
          </ToggleButton>
          
        </ToggleButtonGroup>

        <Tooltip arrow title="Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.">
        <IconButton>
          <HelpOutlineIcon color="info"/>
        </IconButton>
        </Tooltip>
      </Box>

      {/* QR code error message */}
      {rawQrCodeUrl == "" &&
        <Grid item
        xs={12} sm={8} lg={12} xl={11}
        >
        <Alert
          severity="warning"
        >
          {"The signed credential is too large to encode into a raw QR code."}
        </Alert>
        </Grid>
      }
    </Box>
  )
}
