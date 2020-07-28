import React, { useState, useContext, FC, HTMLAttributes } from "react";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import BuildIcon from '@material-ui/icons/Build';
import Collapse from '@material-ui/core/Collapse';
import ExploreIcon from '@material-ui/icons/Explore';
import IconExpandLess from '@material-ui/icons/ExpandLess'
import IconExpandMore from '@material-ui/icons/ExpandMore'
import VpnKeyIcon from '@material-ui/icons/VpnKey';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { VerifiableCredentialEdit, IEditableVerifiableCredentialPreviewProps } from './VerifiableCredentialEdit';
import { useStyles } from './styles';
import { smallList } from './fixtures';




export interface AppBarProps extends HTMLAttributes<HTMLDivElement> {
  open: any;
  setOpen: any;
}

export interface NavBarProps extends HTMLAttributes<HTMLDivElement> {
  document: any;
  setDocument: any;
  open: any;
  setOpen: any;
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export const TheAppBar: FC<AppBarProps> = ({
  open,
  setOpen
}) => {
  const classes = useStyles();
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  return (
    <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
      <Toolbar className={classes.toolbar}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
        >
          <MenuIcon />
        </IconButton>
        <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
          DCC Credential Designer
        </Typography>
        <IconButton color="inherit">
          <Badge badgeContent={4} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export const NavDrawer: FC<NavBarProps> = ({
  document, setDocument, open, setOpen
}) => {
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const classes = useStyles();

  const [expanded, setExpanded] = React.useState(true)

  const handleExpanded = () => {
    setExpanded(!expanded)
  }

  return (<Drawer
    variant="permanent"
    classes={{
      paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
    }}
    open={open}
  >
    <div className={classes.toolbarIcon}>
      <IconButton onClick={handleDrawerClose}>
        <ChevronLeftIcon />
      </IconButton>
    </div>

    <Divider />

    <List component="nav" className={classes.appMenu} disablePadding>
      <ListItem button onClick={handleExpanded} className={classes.menuItem}>
        <ListItemIcon className={classes.menuItemIcon}>
          <ExploreIcon />
        </ListItemIcon>
        <ListItemText primary="Design" />
        {expanded ? <IconExpandLess /> : <IconExpandMore />}
      </ListItem>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Divider />
        <List component="div" disablePadding>

        <ListSubheader inset >Select a template </ListSubheader>
        {smallList.map((item) => {
            return (
              <ListItem button key={item.name} onClick={e => setDocument(item.document)} className={classes.menuItem}>
                <ListItemText primary={item.name} inset />
              </ListItem>
            );
          })} 
        </List>
      </Collapse>
    </List>
    <Divider />
    <div>
      <ListItem button key='issue' onClick={e => setDocument('document')} className={classes.menuItem}>
        <ListItemIcon className={classes.menuItemIcon}>
          <VpnKeyIcon />
        </ListItemIcon>
        <ListItemText primary='Issue' />
      </ListItem>
    </div>
  </Drawer>);
}


export default function Dashboard() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [open, setOpen] = React.useState(true);
  const [document, setDocument] = useState(smallList[0].document);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <TheAppBar open={open} setOpen={setOpen} />
      <NavDrawer document={document} setDocument={setDocument} open={open} setOpen={setOpen} />

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <VerifiableCredentialEdit document={document} setDocument={setDocument} />
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}
