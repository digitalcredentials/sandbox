import React, { FC, useState } from 'react';
import { VerificationProps } from '../components/Props';
import { ScanModal } from '../components/ScanModal';
import { verifyCredential } from '../api/local';
import { Credential, VerificationResultsCard } from '../components';
// import { getConfig } from '../utils/config';
import { 
  Box,
  Button, 
  CircularProgress, 
  Grid, 
  Modal, 
  Typography
 } from '@mui/material';
import useDocumentTitle from '../utils/useDocumentTitle';
import {DropzoneArea} from 'mui-file-dropzone';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';

// const CONFIG = getConfig();

export const Verify: FC<VerificationProps> = ({
  unverifiedDocument,
  setUnverifiedDocument,
  verificationResult,
  setVerificationResult,
}) => {
  // Set page title
  // TODO: make constant?
  useDocumentTitle('Verifier - Digital Credentials Sandbox')

  const [loading, setLoading] = useState(false);
  const [verifyingError, setVerifyingError] = useState<Error>();

  // On verify button
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      setLoading(true);
      // For some reason this delay allows the results to render before page scroll
      await new Promise(resolve => setTimeout(resolve, 1));
      // Attempt to convert text to JSON, apply verify function
      const documentJSON = JSON.parse(unverifiedDocument);
      const result = await verifyCredential(
        documentJSON,
      );
      // If no errors in verifying, set results
      setVerificationResult(result);
      setVerifyingError(undefined);
    } catch (error) {
      // Store error if caught
      setVerifyingError(error);
    } finally {
      // Remove loading bar
      setLoading(false);
      // Scroll down to verification results box
      const element = document.getElementById("results");
      if (element){
        element.scrollIntoView();
      }
    }

  };

  // Update stored credential upon edit
  const editorOnChange = async (data: string, event?: any) => {
    setUnverifiedDocument(data);
    setVerifyingError(undefined);
  };
  
  // Load in JSON file from dropzone into the credential editor
  const setCredentialFromFile = async (file: File) => {
    const reader = new FileReader();

    reader.addEventListener("load", () => {
      // this will then display a text file
      if (typeof reader.result === 'string') {
        setUnverifiedDocument(reader.result);
      }
    }, false);

    if (file) {
      reader.readAsText(file);
    }
  }

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
      <Typography
        variant="h2"
        id="anchor"
      >
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

    <Grid
      container
      spacing={4}
      justifyContent="center"
      alignItems="center"
    >

      <Grid item xs={12} lg={6}>
        {/* File upload section */}
        <DropzoneArea
          dropzoneText="Drag and drop a json file here or click to upload"
          acceptedFiles={[".json"]}
          filesLimit={1}
          onChange={(files) => setCredentialFromFile(files[0])}
          showFileNames={true}
          showPreviewsInDropzone={false}
          fileObjects={[]}
        />
      </Grid>

      <Grid item xs={12} lg={6}
        sx={{
          marginTop: {
            xs: "-35px",
            lg: "10px",
          },
          marginBottom: {
            xs: "15px",
            lg: "20px",
          },
        }}
      >
        {/* Component with QR scan modal and button to open it */}
        <ScanModal onScan={setUnverifiedDocument} setErrorMessage={() =>void 0} />
      </Grid>
    </Grid>
    
    <Credential
      value={unverifiedDocument}
      editing={true}
      onChange={editorOnChange}
    />
  </Grid>


  {/* Verify Button */}
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
          color: "white",
        }}
        onClick={handleSubmit}
        variant="contained"
        size="large"
        color="secondary"
        disabled={Object.keys(verificationResult).length > 0}
        startIcon={<PublishedWithChangesIcon/>}
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
  {((verificationResult.length > 0 || verifyingError) && !loading) &&
    <Grid item xs={12} id="results">
      <VerificationResultsCard error={verifyingError} results={verificationResult}/>
    </Grid>
  }
</Grid>
);
};
