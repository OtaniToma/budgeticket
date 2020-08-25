import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getPlaces } from "../../reducks/flights/selectors";
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Typography from '@material-ui/core/Typography';

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
    image: {
      maxWidth: 800,
      height: '75vh',
      objectFit: 'contain'
    }
  }));
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');

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
            <img src={image} className={classes.image} alt={description} />
            <Typography variant="caption" display="block" gutterBottom>
              {description}
            </Typography>
          </div>
        </Fade>
      </Modal>

      {images.length > 0 && (
        <div className={classes.root}>
          <GridList cellHeight={150} className={classes.gridList} cols={2}>
            {images.map((image) => {
              const handleOpen = () => {
                setImage(image.urls.regular);
                setDescription(image.description);
                setOpen(true);
              }
              return <GridListTile key={image.id} cols={1} onClick={handleOpen}>
                <img src={image.urls.thumb} alt={image.description} />
              </GridListTile>
            })}
          </GridList>
        </div>
      )}
    </>
  );
};

export default Photos;
