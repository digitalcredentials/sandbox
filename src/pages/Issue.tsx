import React, { FC, useState } from 'react';
import { SigningProps } from '../components/Props';
import { signCredential } from '../api/local';
import { 
  Credential, 
  IssueForm, 
  ScanModal
 } from '../components';
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  CircularProgress,
  Grid,
  Tabs,
  Tab,
  Typography,
} from '@mui/material';
import { IssueParams } from '../api/local';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import SendIcon from '@mui/icons-material/Send';
import { Link } from 'react-router-dom'
import useDocumentTitle from '../utils/useDocumentTitle';
import {DropzoneArea, DropzoneDialog} from 'mui-file-dropzone';
import { EditAttributesRounded, SystemSecurityUpdate } from '@mui/icons-material';
import { securityLoader } from '@digitalcredentials/security-document-loader'
import { encodeToQrCodeUrl, encodeToVpUnsigned } from "../utils/codecs";
import { ProvePresentationRequest } from "../api/index";
import { encodeToRawQrCodeUrl } from '../api/encodeRawQr';
import { QROutput } from '../components/QROutput';
import { display } from '@mui/system';


export const Issue: FC<SigningProps> = ({
  unsignedDocument,
  setDocument,
  signedDocument,
  setSignedDocument,
  qrCodeUrls,
  setQrCodeUrls,
  doVerification,
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
  const [displayQrOutput, setDisplayQrOutput] = useState(false);
  const [qrError, setQrError] = useState(false);
  const [signingError, setSigningError] = useState<Error>();
    
  // Update stored unsigned credential upon edit
  const editorOnChange = async (data: string, event?: any) => {
    setDocument(data);
    setDisplayQrOutput(false);
  };

  // Generate QR codes and handle any errors thrown
  const generateQrCodes = async (vpUnsigned: any) => {
    var compressedQrCode = "";
    var rawQrCode = "";
    setQrCodeUrls(["", ""])

    try {
      // Encode the unsigned VP into QR codes
      compressedQrCode = await encodeToQrCodeUrl(vpUnsigned);
      rawQrCode = await encodeToRawQrCodeUrl(vpUnsigned);
    } catch (error) {
    }

    setQrCodeUrls([rawQrCode, compressedQrCode]);
    // console.log(qrCodeUrls);

    // Flag error if neither raw nor compressed are available
    setQrError(rawQrCode == "" && compressedQrCode == "")
    // Turn on QR display
    if (!qrError) setDisplayQrOutput(true);
  }

  // Call local signing function on submit
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    try {
      const documentJSON = JSON.parse(unsignedDocument);
      const signedDocument = await signCredential(documentJSON, options);
      // For some reason this delay allows the results to render before page scroll
      await new Promise(resolve => setTimeout(resolve, 1));
      // Encode the signed VC into an unsigned VP
      const vpUnsigned = encodeToVpUnsigned(signedDocument);
      // const vpSigned = (await ProvePresentationRequest(vpUnsigned)).data;
      // If no errors are thrown, store signed credential
      setSignedDocument(signedDocument);
      setSigningError(undefined);
      setLoading(false);
      // Scroll down to signed credential box
      const element = document.getElementById("signedcredential");
      if (element) {
        if (element) {
        element.scrollIntoView();
      }
      }
      // Generate QR codes
      generateQrCodes(vpUnsigned);
    } catch (error) {
      // Store any errors
      setSigningError(error);
    } finally {
      // Remove loading bar
      setLoading(false);
    }
  };

  // Load in JSON file from dropzone into the credential editor
  const setCredentialFromFile = async (file: File) => {
    const reader = new FileReader();

    reader.addEventListener("load", () => {
      // this will then display a text file
      if (typeof reader.result === 'string') {
        setDocument(reader.result);
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
        
        <Grid
          container
          spacing={4}
          justifyContent="center"
          alignItems="center"
        >

          {/* File upload section */}
          <Grid item xs={12}>
            <DropzoneArea
              dropzoneText="Drag and drop or click here to upload a .json file."
              acceptedFiles={[".json"]}
              filesLimit={1}
              onChange={(files) => setCredentialFromFile(files[0])}
              showFileNames={true}
              showPreviewsInDropzone={false}
              fileObjects={[]}
            />
          </Grid>

          {/* Component with QR scan modal and button to open it */}
          <Grid item xs={12}
          sx={{
            marginTop: {
              xs: "-35px",
            },
            marginBottom: {
              xs: "15px",
              lg: "20px",
            },
          }}>
            <ScanModal onScan={setDocument} setErrorMessage={() =>void 0} />
          </Grid>
        </Grid>

        {/* Credential Editor Box */}
        <Credential
          value={unsignedDocument}
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

      {/* Signing error message */}
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
          xs={Object.keys(signedDocument).length > 0 ? 6 : 12}
          sx={{textAlign: Object.keys(signedDocument).length > 0 ? "right": "center"}}
        >
          <Button
            sx={{
              width: Object.keys(signedDocument).length > 0 ?
              {
                sm:"100%",
                lg:"60%"
              }
              : {
                xs:"80%",
                sm:"50%",
              },
              height: {
                xs:"75px",
                sm:"50px",
              },
              color: "white",
            }}
            onClick={handleSubmit}
            variant="contained"
            size="large"
            disabled={Object.keys(signedDocument).length > 0}
            color="secondary"
            startIcon={<HistoryEduIcon/>}
          >
            Sign Credential
          </Button>
        </Grid>
      }
      {/* Button to move to verify section */}
      {Object.keys(signedDocument).length > 0 &&
        <Grid item xs={6}>
          <Button
            sx={{
              width: {
                sm: "100%",
                lg: "60%",
              },
              height: {
                xs:"75px",
                sm:"50px",
              },
              textAlign: "center",
              color: "white",
            }}

            color="secondary"
            variant="contained"
            endIcon={<SendIcon/>}
            component={Link}
            to="/verify#anchor"
            size="large"
            onClick={doVerification}
          >
            Verify Credential
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
        <Grid item xs={12} md={11} lg={10} xl={qrError ? 10 : 7}>
          {/* Signed credential header */}
          <Typography
            variant="h2"
            id="signedcredential"
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

      {/* Signed Credential QR Code output */}
      {displayQrOutput &&
        <Grid item xs={12} xl={4}>
          {/* QR Output header */}
          <Typography
            variant="h2"
            id="signedcredential"
            sx={{
              pl: "0.5rem",
              textAlign: "center"}}
          >
            QR Code
          </Typography>

          {/* QR code display panel */}
          <QROutput
            rawQrCodeUrl={qrCodeUrls[0]}
            compressedQrCodeUrl={qrCodeUrls[1]}
          />
        </Grid>
      }

      {/* QR code error message */}
      {Object.keys(signedDocument).length > 0 &&
      qrError &&
        <Grid item
          xs={12} sm={11} md={9} lg={7} xl={6}
        >
          <Alert
            severity="warning"
          >
            {"The signed credential is too large to encode into a QR code."}
          </Alert>
        </Grid>
      }
    </Grid>
  );
};
