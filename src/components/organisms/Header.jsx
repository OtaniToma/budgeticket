import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { getIsSignedIn, getUserId, getUsername, getTicketsInLiked } from "../../reducks/users/selectors";
import HeaderMenus from "../molecules/HeaderMenus";
import ClosableDrawer from "./ClosableDrawer";
import { fetchTicketsInLiked } from '../../reducks/users/operations';
import { db } from '../../firebase/index';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuBar: {},
  toolBar: {
    margin: "0 auto",
    maxWidth: 1024,
    width: "100%",
  },
  iconButtons: {
    margin: "0 0 0 auto",
  },
  title: {
    flexGrow: 1,
  },
}));

const Header = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const uid = getUserId(selector);
  const username = getUsername(selector);
  const isSignedIn = getIsSignedIn(selector);
  let ticketsInLiked = getTicketsInLiked(selector);

  useEffect(() => {
    if (isSignedIn) {
      const unsubscribe = db.collection('users').doc(uid).collection('liked')
        .onSnapshot(snapshots => {

          console.log(snapshots)
          
          snapshots.docChanges().forEach(change => {
            const ticket = change.doc.data();
            const changeType = change.type;

            switch (changeType) {
              case 'added':

                console.log(ticketsInLiked)
                console.log(ticket)
                console.log([...ticketsInLiked, ticket])

                dispatch(fetchTicketsInLiked([...ticketsInLiked, ticket]));
                break;
              case 'modified':
                dispatch(fetchTicketsInLiked(ticketsInLiked.map(item => {
                  if (item.likedId === change.doc.id) {
                    return ticket
                  }
                  return item
                })));
                break;
              case 'removed':
                dispatch(fetchTicketsInLiked(ticketsInLiked.filter(item =>
                  item.likedId !== change.doc.id
                )));
                break;
              default:
                break;
            }
          })
        })
      return () => unsubscribe()
    }
  }, [ticketsInLiked])

  const [open, setOpen] = useState(false);
  const handleDrawerToggle = useCallback(
    (event) => {
      if (
        event.type === "keydown" &&
        (event.key === "Tab" || event.key === "Shift")
      ) {
        return;
      }
      setOpen(!open);
    },
    [setOpen, open]
  );

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.menuBar}>
        <Toolbar className={classes.toolBar}>
          <Typography
            variant="h6"
            className={classes.title}
            onClick={() => dispatch(push("/"))}
          >
            BudgeTicket
          </Typography>

          {isSignedIn && (
            <>
              <div className={classes.iconButtons}>
                <Typography
                  variant="span"
                  onClick={() => dispatch(push("/user/profile"))}
                >
                  Hi, {username}
                </Typography>
              </div>
              <HeaderMenus
                handleDrawerToggle={handleDrawerToggle}
                ticketNumbers={ticketsInLiked.length}
              />
            </>
          )}

          {!isSignedIn &&
            <IconButton onClick={() => dispatch(push("/signin"))}>
              <AccountCircleIcon />
            </IconButton>
          }

        </Toolbar>
      </AppBar>
      <ClosableDrawer open={open} onClose={handleDrawerToggle} />
    </div>
  );
};

export default Header;
