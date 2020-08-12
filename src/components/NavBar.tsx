import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import IconExpandLess from '@material-ui/icons/ExpandLess';
import IconExpandMore from '@material-ui/icons/ExpandMore';
import ExploreIcon from '@material-ui/icons/Explore';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CheckIcon from '@material-ui/icons/Check';
import clsx from 'clsx';
import React, { FC } from "react";
import { Link as RouterLink } from "react-router-dom";
import { smallList } from '../fixtures';
import { useStyles } from '../styles';
import { DocProps } from './Props';


export const NavBar: FC<DocProps> = ({
  document, setDocument
}) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(true);
  const [expanded, setExpanded] = React.useState(true);
  const [selected, setSelected] = React.useState(0);

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleExpanded = () => {
    setExpanded(!expanded);
    updateSelected(0);
  };

  const updateSelected = (selectedIndex: number) => {
    setSelected(selectedIndex);
  };

  const updateSample = (sample: any) => {
    updateSelected(0);
    setDocument(sample);
  }

  return (
    <div>
      <div >
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
              DCC Credential Playground
        </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
      <Drawer
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
          <ListItem button onClick={handleExpanded} className={classes.menuItem} selected={selected===0}>
            <ListItemIcon className={classes.menuItemIcon}>
              <ExploreIcon />
            </ListItemIcon>
            <ListItemText primary="Design" />
            {expanded ? <IconExpandLess /> : <IconExpandMore />}
          </ListItem>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Divider />
            <List component="div" disablePadding>
              <ListSubheader inset>Select a template </ListSubheader>
              {smallList.map((item) => {
                return (
                  <ListItem button key={item.name} component={RouterLink} to="/" onClick={() => updateSample(item.document)} className={classes.menuItem}>
                    <ListItemText primary={item.name} inset />
                  </ListItem>
                );
              })}
            </List>
          </Collapse>
        </List>
        <Divider />
        <div>
          <ListItem button key='issue' component={RouterLink} to="/issue" className={classes.menuItem} onClick={() => updateSelected(1)} selected={selected === 1}>
            <ListItemIcon className={classes.menuItemIcon}>
              <VpnKeyIcon />
            </ListItemIcon>
            <ListItemText primary='Issue' />
          </ListItem>
          <ListItem button key='verify' component={RouterLink} to="/verify" className={classes.menuItem} onClick={() => updateSelected(2)} selected={selected === 2}>
            <ListItemIcon className={classes.menuItemIcon}>
              <CheckIcon />
            </ListItemIcon>
            <ListItemText primary='Verify' />
          </ListItem>
          <ListItem button key='request' component={RouterLink} to="/request" className={classes.menuItem} onClick={() => updateSelected(3)} selected={selected === 3}>
            <ListItemIcon className={classes.menuItemIcon}>
              <AddCircleIcon />
            </ListItemIcon>
            <ListItemText primary='Request' />
          </ListItem>
        </div>
      </Drawer>
    </div>
  );
};
