import React, { useEffect, useState } from "react";
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

  const [likedTickets, setLikedTickets] = useState(0);

  useEffect(() => {
    let ticketsInLiked = getTicketsInLiked(selector);
    const unsubscribe = db.collection('users').doc(uid).collection('liked')
      .onSnapshot(snapshots => {
        snapshots.docChanges().forEach(change => {
          const ticket = change.doc.data();
          const changeType = change.type;

          switch (changeType) {
            case 'added':

              // console.log(...ticketsInLiked)
              // console.log(ticket)

              ticketsInLiked.push(ticket)
              console.log(ticketsInLiked)

              dispatch(fetchTicketsInLiked([
                ...ticketsInLiked,
                ticket
              ]));

              debugger
              
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
              dispatch(fetchTicketsInLiked(ticketsInLiked.filter(item => item.likedId !== change.doc.id)));
              break;
            default:
              break;
          }
        })
        // dispatch(fetchTicketsInLiked(ticketsInLiked));
        // setLikedTickets(ticketsInLiked.length);
      })
    return () => unsubscribe()
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {isSignedIn && (
        <div>
          <IconButton onClick={() => dispatch(push("/user/liked"))}>
            <Badge badgeContent={likedTickets} color="secondary">
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
