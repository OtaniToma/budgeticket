import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getPlaces } from "../../reducks/flights/selectors";
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const Photos = ({ images }) => {

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: '100%',
      height: 'auto',
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [image, setImage] = useState('');

  const handleOpen = (props) => {
    setImage(props);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <img src={image} />
          </div>
        </Fade>
      </Modal>

      {images && (
        <div className={classes.root}>
        <GridList cellHeight={150} className={classes.gridList} cols={2}>
          {images.map((image) => (
            <GridListTile key={image.id} cols={1} onClick={handleOpen(image.urls.regular)}>
              <img src={image.urls.thumb} alt={image.description} />
            </GridListTile>
          ))}
        </GridList>
      </div>
      )}
    </>
  );
};

export default Photos;
