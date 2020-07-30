import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import CartList from "../templates/CartList";

const Cart = () => {
  const useStyles = makeStyles({
    root: {
      marginTop: '100px',
    },
  });
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CartList />
    </div>
  );
};

export default Cart;
