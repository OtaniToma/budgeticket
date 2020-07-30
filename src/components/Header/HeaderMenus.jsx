import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import MenuIcon from "@material-ui/icons/Menu";
import { getIsSignedIn, getUserId, getTicketsInCart, getUsername } from "../../reducks/users/selectors";
import { push } from "connected-react-router";
import { fetchTicketsInCart } from '../../reducks/users/operations';
import { db } from '../../firebase/index';

const HeaderMenus = (props) => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const uid = getUserId(selector);
  const isSignedIn = getIsSignedIn(selector);
  let ticketsInCart = getTicketsInCart(selector);

  useEffect(() => {
    const unsubscribe = db.collection('users').doc(uid).collection('cart')
      .onSnapshot(snapshots => {
        snapshots.docChanges().forEach(change => {
          const ticket = change.doc.data();
          const changeType = change.type;

          switch (changeType) {
            case 'added':
              ticketsInCart.push(ticket);
              break;
            case 'modified':
              const index = ticketsInCart.findIndex(ticket => ticket.cartId === change.doc.id);
              ticketsInCart[index] = ticket;
              break;
            case 'removed':
              ticketsInCart = ticketsInCart.filter(ticket => ticket.cartId !== change.doc.id);
              break;
            default:
              break;
          }
        })
        dispatch(fetchTicketsInCart(ticketsInCart));
      })
    return () => unsubscribe()
  }, []);

  return (
    <>
      {isSignedIn && (
        <div>
          <IconButton onClick={() => dispatch(push("/cart"))}>
            <Badge badgeContent={ticketsInCart.length} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          <IconButton onClick={() => dispatch(push("/liked"))}>
            <FavoriteBorderIcon />
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
