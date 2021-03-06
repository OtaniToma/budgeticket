import React from 'react';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/list';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {makeStyles} from '@material-ui/styles';
import {useDispatch} from 'react-redux';
import {push} from 'connected-react-router';
import {signOut} from '../../reducks/users/operations';

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      flexShrink: 0,
      width: 256,
    },
  },
  toolBar: theme.mixins.toolbar,
  drawerPaper: {
    width: 256,
  },
  searchField: {
    alignItems: 'center',
    display: 'flex',
    marginLeft: 32,
  },
}));

const ClosableDrawer = (props) => {
  const classes = useStyles();
  const {container} = props;
  const dispatch = useDispatch();

  const selectMenu = (event, path) => {
    dispatch(push(path));
    props.onClose(event);
  };

  const menus = [
    {
      func: selectMenu,
      label: 'Home',
      icon: <HomeIcon />,
      id: 'home',
      value: '/',
    },
    {
      func: selectMenu,
      label: 'Liked Tickets',
      icon: <FavoriteIcon />,
      id: 'liked',
      value: '/user/liked',
    },
    {
      func: selectMenu,
      label: 'Booked Tickets',
      icon: <FlightTakeoffIcon />,
      id: 'liked',
      value: '/user/booked',
    },
  ];

  const onClick = () => dispatch(signOut());

  return (
    <nav className={classes.drawer}>
      <Drawer
        container={container}
        variant="temporary"
        anchor="right"
        open={props.open}
        onClose={props.onClose}
        classes={{paper: classes.drawerPaper}}
        ModalProps={{keepMounted: true}}
      >
        <div onClose={props.onClose}>
          <Divider />
          <List>
            {menus.map((menu) => (
              <ListItem
                button
                key={menu.id}
                onClick={(e) => menu.func(e, menu.value)}
              >
                <ListItemIcon>{menu.icon}</ListItemIcon>
                <ListItemText primary={menu.label} />
              </ListItem>
            ))}
            <ListItem button key="signout" onClick={onClick}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary={'Sign Out'} />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </nav>
  );
};

export default ClosableDrawer;
