import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MenuIcon from "@material-ui/icons/Menu";
import { getIsSignedIn, getUserId, getTicketsInLiked } from "../../reducks/users/selectors";
import { push } from "connected-react-router";
import { fetchTicketsInLiked } from '../../reducks/users/operations';
import { db } from '../../firebase/index';

const HeaderMenus = (props) => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const uid = getUserId(selector);
  const isSignedIn = getIsSignedIn(selector);
  let ticketsInLiked = getTicketsInLiked(selector);

  useEffect(() => {
    const unsubscribe = db.collection('users').doc(uid).collection('liked')
      .onSnapshot(snapshots => {
        snapshots.docChanges().forEach(change => {
          const ticket = change.doc.data();
          const changeType = change.type;

          switch (changeType) {
            case 'added':
              ticketsInLiked.push(ticket);
              break;
            case 'modified':
              const index = ticketsInLiked.findIndex(ticket => ticket.likedId === change.doc.id);
              ticketsInLiked[index] = ticket;
              break;
            case 'removed':
              ticketsInLiked = ticketsInLiked.filter(ticket => ticket.likedId !== change.doc.id);
              break;
            default:
              break;
          }
        })
        dispatch(fetchTicketsInLiked(ticketsInLiked));
      })
    return () => unsubscribe()
  }, []);

  return (
    <>
      {isSignedIn && (
        <div>
          <IconButton onClick={() => dispatch(push("/user/liked"))}>
            <Badge badgeContent={ticketsInLiked.length} color="secondary">
              <FavoriteIcon />
            </Badge>
          </IconButton>
          <IconButton onClick={(event) => props.handleDrawerToggle(event)}>
            <MenuIcon />
          </IconButton>
        </div>
      )}
    </>
  );
};

export default HeaderMenus;
