import { JSONEditor, LinkedDataPropertyTable } from '@material-did/common';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React, { FC } from 'react';
import { DocProps } from './Props';



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



export const VerifiableCredentialEdit: FC<DocProps> = ({
  document, setDocument
}) => {
  const classes = useStyles();
  const [tabIndex, setTabIndex] = React.useState(0);

  const handleTabSelect = (_event: any, newValue: any) => {
    setTabIndex(newValue);
  };

  const editorOnChange = (data: string) => {
    setDocument(JSON.parse(data));
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color={'primary'}>
        <Tabs value={tabIndex} onChange={handleTabSelect} aria-label="VC Tabs">
          <Tab label="Source" {...a11yProps(0)} />
          <Tab label="Table" {...a11yProps(1)} />
          <Tab label="Card" {...a11yProps(2)} />
          <Tab label="QR Code" {...a11yProps(3)} />
        </Tabs>
      </AppBar>


      <TabPanel value={tabIndex} index={0}>
        <JSONEditor value={JSON.stringify(document, null, 2)}
          onChange={editorOnChange}
        />
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        <LinkedDataPropertyTable document={document} />
      </TabPanel>
      <TabPanel value={tabIndex} index={2}>
        <Typography>CredentialCard is coming soon!</Typography>
      </TabPanel>
      <TabPanel value={tabIndex} index={3}>
        <Typography>QR code is coming soon!</Typography>
      </TabPanel>
    </div>
  );
};

//         