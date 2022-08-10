import React, { FC, useState } from "react";
import { VerificationProps } from "../components/Props";
import { VerifyCredential } from "../api/local";
import { Credential, VerifyForm } from "../components";
import { getConfig } from "../utils/config";
import { VerificationResultsCard } from "../components";
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
      const result = response;
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
    setVerifyingError(undefined);
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
      display: {
        xs: "block",
        md: "flex",
      },
      flexGrow: 1,
      alignItems: "baseline",
      mb: ".75rem"
    }}>
      <Typography variant="h2">
        Unverified Credential
      </Typography>
      
      <Typography
        variant="h3"
        sx={{
          ml: {
            xs: 0,
            md: "2%",
          },
          mt: {
            xs: "0.35rem",
            md: 0,
          },
        }}
      >
        Enter your signed credential below
      </Typography>
    </Box>
    <Credential
      value={unverifiedDocument}
      editing={true}
      onChange={editorOnChange}
    />
  </Grid>
  

  {/* Issue Button */}
  {!loading &&
    <Grid item
      xs={12}
      sx={{textAlign: "center"}}
    >
      <Button
        sx={{
          width: {
            xs:"80%",
            sm:"50%",
          },
        }}
        onClick={handleSubmit}
        variant="contained"
        size="large"
        color="primary"
        disabled={Object.keys(verificationResult).length > 0}
      >
        Verify Credential
      </Button>
    </Grid>
  }

  {/* Loading spinner */}
  {loading &&
    <Grid item
      xs={12}
      sx={{textAlign: "center"}}
    >
      <CircularProgress/>
    </Grid>
  }

  {/* If there are signs verification has been run, show results card */}
  {(verificationResult.length > 0 || verifyingError) &&
    <Grid item xs={12}>
      <VerificationResultsCard error={verifyingError} results={verificationResult}/>
    </Grid>
  }
  
</Grid>
);
};
