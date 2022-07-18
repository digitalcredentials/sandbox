import React, { FC, useState } from "react";
import { VerificationProps } from "../components/Props";
import { VerifyDocumentRequest } from "../api";
import { VerifyCredential } from "../api/local";
import { Credential, VerifyForm } from "../components";
import { getConfig } from "../utils/config";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";

const CONFIG = getConfig();

export const Verify: FC<VerificationProps> = ({
  unverifiedDocument,
  setUnverifiedDocument,
  verificationResult,
  setVerificationResult, 
}) => {
  const [loading, setLoading] = useState(false);
  const [verifyingError, setVerifyingError] = useState<Error>();

  // On verify button
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      setLoading(true);
      // Attempt to convert text to JSON, apply verify function
      const documentJSON = JSON.parse(unverifiedDocument);
      const response = await VerifyCredential(
        documentJSON,
      );
      const result = response.data;
      setVerificationResult(result);
      setVerifyingError(undefined);
    } catch (error) {
      console.log(error);
      setVerifyingError(error);
    } finally {
      setLoading(false);
    }
  };
  
  // Update stored credential upon edit
  const editorOnChange = async (data: string, event?: any) => {
    setUnverifiedDocument(data);
  };

return (
  <Grid
  container
  spacing={4}
  justifyContent="center"
  sx={{mt: "-.5rem"}}
>
  {/* Unsigned Credential Editor Section */}
  <Grid item xs={12}>
    <Box sx={{
      display: "flex",
      flexGrow: 1,
      alignItems: "baseline",
      mb: ".75rem"
    }}>
      <Typography
        variant="h2"
      >Unverified Credential</Typography>
      <Typography
        variant="h3"
        sx={{ml: "2%"}}
      >Enter your signed credential below</Typography>
    </Box>
    <Credential
      value={unverifiedDocument}
      editing={true}
      onChange={editorOnChange}
    />
  </Grid>
  
  {/* Error message */}
  {verifyingError &&
    <Grid item
      xs={8}
    >
      <Alert
        severity="error"
      >
        <AlertTitle><strong>{verifyingError.name}</strong></AlertTitle>
        {verifyingError.message}
      </Alert>
    </Grid>
  }

  {/* Issue Button */}
  {!loading &&
    <Grid item
      xs={12}
      sx={{textAlign: "center"}}
    >
      <Button
        sx={{width: "50%"}}
        onClick={handleSubmit}
        variant="contained"
        size="large"
        color="primary">Verify Credential</Button>
    </Grid>
  }

  {loading &&
    <Grid item
      xs={12}
      sx={{textAlign: "center"}}
    >
      <CircularProgress/>
    </Grid>
  }
  
</Grid>
);
};
