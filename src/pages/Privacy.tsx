import React from 'react';
import { Box, Typography,} from '@mui/material';

export const Privacy = ({}) => {
    return (
        <Box>
          {/* DCC Developer Sandbox Privacy Policy content*/}
              <Box>
                <Typography
                  variant="h1"
                  align="center"
                  sx={{py: 2}}
                >
                  DCC Developer Sandbox Privacy Policy
                </Typography> 
                <Typography variant="h2" sx={{my: 2}}>Introduction</Typography> 
                <Typography variant="body1" sx={{my: 2}}>DCC Developer Sandbox is an open source mobile wallet developed by the <a href="https://digitalcredentials.mit.edu">Digital Credentials Consortium</a>, a network of leading international universities designing an open infrastructure for academic credentials.
                This Privacy Policy explains how DCC Developer Sandbox collects, uses, and processes personal information about our learners.</Typography> 
                <Typography variant="h2" sx={{my: 2}}>What Personal Information We Collect</Typography> 
                <Typography variant="body1" sx={{my: 2}}>We do not collect any personal information.</Typography> 
                <Typography variant="h2" sx={{my: 2}}>Additional Information</Typography> 
                <Typography variant="body1" sx={{my: 2}}>We may change this Privacy Policy from time to time. If we make any significant changes in the way we treat your personal information we will make this clear on our website or by contacting you directly. The controller for your personal information is the DCC Developer Sandbox project at MIT.</Typography> 
              </Box> {/* end of text-container */}
        </Box>
      );
    }