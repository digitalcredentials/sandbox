import React, { FC, HTMLAttributes } from 'react';

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary'

import {
  JSONEditor, LinkedDataPropertyTable, IVerifiableCredentialPreviewProps
} from '@material-did/common';

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}


TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#bdbdbd',
  },
}));

const ErrorFallback: FC<FallbackProps> = ( { error, componentStack, resetErrorBoundary } ) => {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error?.message}</pre>
      <pre>{componentStack}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
};

const myErrorHandler = (error: Error, componentStack: string) => {
  console.error(error);
}

export interface IEditableVerifiableCredentialPreviewProps extends IVerifiableCredentialPreviewProps {
  document: any;
  setDocument: any
}

export const VerifiableCredentialEdit: FC<IEditableVerifiableCredentialPreviewProps> = ({
  document, setDocument
}) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (_event: any, newValue: any) => {
    setValue(newValue);
  };

  const editorOnChange = (data: string) => {
    setDocument(JSON.parse(data));
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color={'primary'}>
        <Tabs value={value} onChange={handleChange} aria-label="VC Tabs">
          <Tab label="Source" {...a11yProps(0)} />
          <Tab label="Table" {...a11yProps(1)} />
          <Tab label="Card" {...a11yProps(2)} />
          <Tab label="QR Code" {...a11yProps(3)} />
        </Tabs>
      </AppBar>


      <TabPanel value={value} index={0}>
        <JSONEditor value={JSON.stringify(document, null, 2)}
          onChange={editorOnChange}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>

        <ErrorBoundary fallback={<div>Oh no</div>}>
          <LinkedDataPropertyTable document={document} />
        </ErrorBoundary>

      </TabPanel>
      <TabPanel value={value} index={2}>
        <Typography>CredentialCard is coming soon!</Typography>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Typography>QR code is coming soon!</Typography>
      </TabPanel>
    </div>
  );
};

//         