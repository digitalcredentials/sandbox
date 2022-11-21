// This component contains both the button to open the QR code modal, and the modal itself

import React from 'react';
import { QrReader } from 'react-qr-reader';
import { Result } from '@zxing/library';
import {
  Box,
  Button,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';

type PropsType = {
  onScan: (result: string) => void;
  setErrorMessage: (scanError: boolean) => void;
}

export const ScanModal = ({ onScan, setErrorMessage }: PropsType) => {
  
  const handleScan = (newData?: Result | null, error?: Error | null) => {
    if (newData){
      onScan(newData.getText());
      closeModal();
    }

    if (error){
      // console.log("error");
      setErrorMessage(true)
    }
  }
 
  function closeModal() {
    setOpen(false);
  }

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // width: '40%',
    maxWidth: '600px',
    width: '95%',
    bgcolor: 'background.paper',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
    zIndex: 9999,
  };

  return (
    <Box>

      {/* This is the button to open the modal */}
      <Button
        onClick={handleOpen}
        variant="contained"
        startIcon={<QrCodeScannerIcon/>}
        size="large"
        sx={{
          width: "100%",
          height: "70px",
          marginTop: {
            xs: "-30px",
            lg: "20px",
          },
          marginBottom: {
            xs: "15px",
            lg: "20px",
          },
          fontSize: "15px",
        }}
      >
        Scan a QR code to upload
      </Button>
      
      {/* The modal window itself */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* Modal header bar */}
          <Box sx={{
            display: "flex",
            justifyContent: "space-between",
            flexGrow: 1,
            alignItems: "baseline",
            mb: "-25px",
          }}>
            <Typography variant="h2">
              Scan a QR Code
            </Typography>
            {/* X button to close modal */}
            <IconButton
            onClick={closeModal}
            sx={{left:0,}}
            >
              <CloseIcon color="info" fontSize="medium"/>
            </IconButton>

          </Box>

          {/* QR code scanner */}
          <QrReader 
            onResult={(result, error) => handleScan(result, error)}
            constraints={{facingMode: "environment"}}
          />
        </Box>
      </Modal>

    </Box>
  )
}