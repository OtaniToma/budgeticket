import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import LikedList from "../templates/LikedList";

const Liked = () => {
  const useStyles = makeStyles({
    root: {
      marginTop: '100px',
    },
  });
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <LikedList />
    </div>
  );
};

export default Liked;
