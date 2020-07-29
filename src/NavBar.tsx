import React, { FC } from "react";
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import List from '@material-ui/core/List';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Collapse from '@material-ui/core/Collapse';
import ExploreIcon from '@material-ui/icons/Explore';
import IconExpandLess from '@material-ui/icons/ExpandLess';
import IconExpandMore from '@material-ui/icons/ExpandMore';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { IEditableVerifiableCredentialPreviewProps } from './VerifiableCredentialEdit';
import { useStyles } from './styles';
import { smallList } from './fixtures';

export const NavBar: FC<IEditableVerifiableCredentialPreviewProps> = ({
  document, setDocument
}) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(true);
  const [expanded, setExpanded] = React.useState(true);

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <div className={classes.root}>
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

              <ListSubheader inset>Select a template </ListSubheader>
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
      </Drawer>
    </div>
  );
};
