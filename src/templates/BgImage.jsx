import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

const bgimages = [
  'https://images.unsplash.com/photo-1593182440709-4b7b56482c55?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2048&q=80',
  'https://images.unsplash.com/photo-1517400508447-f8dd518b86db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2048&q=80',
  'https://images.unsplash.com/photo-1483450388369-9ed95738483c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2048&q=80',
];

const randomBgImg = bgimages[Math.floor(Math.random() * bgimages.length)];

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: `url('${randomBgImg}')`,
    width: '100vw',
    height: '100vh',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const BgImage = ({children}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {children}
    </div>
  );
};

export default BgImage;
