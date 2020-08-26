import React, {useState, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {push} from 'connected-react-router';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import {getIsSignedIn, getUsername} from '../../reducks/users/selectors';
import HeaderMenus from '../molecules/HeaderMenus';
import Drawer from './Drawer';
import Button from '../atoms/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Header = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const isSignedIn = getIsSignedIn(selector);
  const username = getUsername(selector);

  const [open, setOpen] = useState(false);

  const handleDrawerToggle = useCallback((event) => {
    if (
      event.type === 'keydown' &&
    (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setOpen(!open);
  }, [setOpen, open]);

  const preventDefault = (event) => event.preventDefault();

  return (
    <>
      <div className={classes.root}>
        <AppBar color="default" position="fixed">
          <Toolbar>
            <Typography
              variant="h6"
              className={classes.title}
              onClick={() => dispatch(push('/'))}
            >
              <Link href="#"
                onClick={preventDefault}
                color="inherit">
                  BudgeTicket
              </Link>
            </Typography>
            {isSignedIn && (
              <>
                <div className={classes.iconButtons}>
                  <Typography variant="span">
                    Hi, {username}
                  </Typography>
                </div>
                <HeaderMenus handleDrawerToggle={handleDrawerToggle} />
              </>
            )}
            {!isSignedIn &&
              <Button
                color={'default'}
                label={'Sign In'}
                onClick={() => dispatch(push('/signin'))}
              />
            }
          </Toolbar>
        </AppBar>
      </div>
      <Drawer open={open} onClose={handleDrawerToggle} />
    </>
  );
};

export default Header;
