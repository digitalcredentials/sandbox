import React, { FC, useState } from 'react';
import { SigningProps } from '../components/Props';
import { signCredential } from '../api/local';
import { Credential, IssueForm } from '../components';
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  CircularProgress,
  Grid,
  Typography,
} from '@mui/material';
import { IssueParams } from '../api/local';
import SendIcon from '@mui/icons-material/Send';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Link } from 'react-router-dom'
import useDocumentTitle from '../utils/useDocumentTitle';


export const Issue: FC<SigningProps> = ({
  document,
  setDocument,
  signedDocument,
  setSignedDocument,
}) => {

  // Set page title
  // TODO: make constant?
  useDocumentTitle('Issuer - Digital Credentials Sandbox')

  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<IssueParams>(
    {
      randomDid: true,
      didSeed: "",
      didMethod: "did:key",
      serializationType: "JSON-LD",
      keySuite: "Ed25519Signature2020",
    }
  );
  const [signingError, setSigningError] = useState<Error>();

  // Call local signing function on submit
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    try {
      const documentJSON = JSON.parse(document);
      const signedDocument = await signCredential(documentJSON, options);
      //TODO: remove fake delay (just aesthetic to see loading spinner)
      await new Promise(resolve => setTimeout(resolve, 300));
      setSignedDocument(signedDocument);
      setSigningError(undefined);
    } catch (error) {
      setSigningError(error);
    } finally {
      setLoading(false);
    }
  };

  // Update stored unsigned credential upon edit
  const editorOnChange = async (data: string, event?: any) => {
    setDocument(data);
  };

  return (
    <Grid
      container
      spacing={4}
      justifyContent="center"
      sx={{mt: "-.5rem"}}
    >
      {/* Unsigned Credential Editor Section */}
      <Grid item xs={12} lg={8}>
        {/* Credential editor headers */}
        <Box sx={{
          display: {
            xs: "block",
            sm: "flex",
          },
          flexGrow: 1,
          alignItems: "baseline",
          mb: ".75rem"
        }}>
          <Typography variant="h2">
            Unsigned Credential
          </Typography>

          <Typography
            variant="h3"
            sx={{
              ml: {
                xs: 0,
                sm: "2%",
              },
              mt: {
                xs: "0.35rem",
                sm: 0,
              },
            }}
          >
            Enter your credential below
          </Typography>
        </Box>


        {/* Credential Editor Box */}
        <Credential
          value={document}
          editing={true}
          onChange={editorOnChange}
        />
      </Grid>

      {/* Signing Parameters */}
      <Grid item xs={12} lg={4}>
        <IssueForm
          handleSubmit={handleSubmit}
          loading={loading}
          formState={options}
          setOptions={setOptions}
        />
      </Grid>

      {/* Error message */}
      {signingError &&
        <Grid item
          xs={8}
        >
          <Alert
            severity="error"
          >
            <AlertTitle><strong>{signingError.name}</strong></AlertTitle>
            {signingError.message}
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
            sx={{
              width: {
                xs:"80%",
                sm:"50%",
              },
            }}
            onClick={handleSubmit}
            variant="contained"
            size="large"
            disabled={Object.keys(signedDocument).length > 0}
            color="primary"
          >
            Sign Credential
          </Button>
        </Grid>
      }

      {/* Loading bar */}
      {loading &&
        <Grid item
          xs={12}
          sx={{textAlign: "center"}}
        >
          <CircularProgress/>
        </Grid>
      }

      {/* Signed Credential Section */}
      {Object.keys(signedDocument).length > 0 &&
        <Grid item xs={12}>
          <Typography
            variant="h2"
            sx={{
              pl: "0.5rem",
              textAlign: "center"}}
          >
            <CheckCircleIcon
              fontSize="large"
              sx={{
                color: "green",
                mb: "-8px",
                mr: "8px",
              }}
            />
            Signed Credential
          </Typography>
          <Credential
            editing={false}
            value={signedDocument ? JSON.stringify(signedDocument, null, 2) : "{}"}
          />
        </Grid>
      }

      {/* Button to move to verify section */}
      {Object.keys(signedDocument).length > 0 &&
        <Grid item xs={12} sx={{textAlign: "center"}}>
          <Button
            sx={{
              width: {
                xs: "80%",
                sm: "40%",
              },
            }}

            color="primary"
            variant="text"
            endIcon={<SendIcon/>}
            component={Link}
            to="/verify#anchor"
            size="large"
          >
            Verify this Credential
          </Button>
        </Grid>
      }
    </Grid>
  );
};
