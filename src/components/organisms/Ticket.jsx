import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteIcon from '@material-ui/icons/Delete';
import Divider from '@material-ui/core/Divider';
import './Ticket.scss';
import {getIsSignedIn} from '../../reducks/users/selectors';
import {Button} from '../atoms';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';


const Ticket = (props) => {
  const {
    price,
    currencies,
    direct,
    departAirportCode,
    arriveAirportCode,
    departAirportName,
    arriveAirportName,
    outboundCarriers,
    inboundCarriers,
    outboundCarriersLogo,
    inboundCarriersLogo,
    outboundDepartureDate,
    inboundDepartureDate,
    likeTicket,
    deleteTicket,
    confirmTicket,
    showMessage,
  } = props;

  const selector = useSelector((state) => state);
  const isSignedIn = getIsSignedIn(selector);

  const [liked, setLiked] = useState(false);

  const _likeTicket = () => {
    if (liked) {
      return false;
    }
    likeTicket(props);
    setLiked(true);
    showMessage();
  };

  const _deleteTicket = () => {
    deleteTicket(props);
    setLiked(false);
  };

  const _confirmTicket = () => {
    confirmTicket(props);
  };

  const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
    caption: {
      color: '#616161',
      lineHeight: 1.25,
    },
  }));
  const classes = useStyles();

  return (
    <div className={'ticket'}>
      <div className="ticket__container">
        <div className="ticket__left">
          <div className="left__container">
            <div className="left__wrapper">
              <div className="left__row1">
                <div className="airline">
                  <img src={outboundCarriersLogo} alt={outboundCarriers} />
                </div>
                <div className="outdate">
                  {outboundDepartureDate}
                </div>
                <div className="depAirport">
                  <span className="depAirport__iata">
                    {departAirportCode}
                  </span>
                  <span className="depAirport__city">
                    {departAirportName}
                  </span>
                </div>
                <div className="arrow">
                  <ArrowRightAltIcon style={{fill: 'darkgrey', fontSize: 16}} />
                </div>
                <div className="arrAirport">
                  <span className="arrAirport__iata">
                    {arriveAirportCode}
                  </span>
                  <span className="arrAirport__city">
                    {arriveAirportName}
                  </span>
                </div>
              </div>
              <div className="left__row2">
                <div className="airline">
                  <img src={inboundCarriersLogo} alt={inboundCarriers} />
                </div>
                <div className="outdate">
                  {inboundDepartureDate}
                </div>
                <div className="depAirport">
                  <span className="depAirport__iata">
                    {arriveAirportCode}
                  </span>
                  <span className="depAirport__city">
                    {arriveAirportName}
                  </span>
                </div>
                <div className="arrow">
                  <ArrowRightAltIcon style={{fill: 'darkgrey', fontSize: 16}} />
                </div>
                <div className="arrAirport">
                  <span className="arrAirport__iata">
                    {departAirportCode}
                  </span>
                  <span className="arrAirport__city">
                    {departAirportName}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ticket__punchline">
          <div className="ticket__punchline__top"></div>
          <div className="ticket__punchline__bottom"></div>
        </div>
        <div className={direct ? 'ticket__right non-stop' : 'ticket__right with-stop'}>
          <span className="ticket__right__price">
            {currencies.Symbol} {price}
          </span>

          {!isSignedIn &&
            <>
              <Divider />
              <Button
                label={'Select'}
                color={'primary'}
                size={'small'}
                variant={'outlined'}
                endIcon={<ArrowForwardIosIcon />}
                disabled
              />
              <Typography className={classes.caption} variant="caption"
                display="block" gutterBottom>
                Ticket will be available after sign in
              </Typography>
            </>}

          {isSignedIn && confirmTicket &&
            <>
              <Divider />
              <Button onClick={_confirmTicket}
                label={'Select'}
                color={'primary'}
                size={'small'}
                variant={'outlined'}
                endIcon={<ArrowForwardIosIcon />}
              />
            </>}

          {isSignedIn && likeTicket && <div className="ticket__right__icon">
            <IconButton aria-label="like" className={classes.margin}
              size="medium" onClick={_likeTicket}>
              <FavoriteIcon fontSize="inherit"
                color={liked ? 'secondary' : 'disabled'} />
            </IconButton>
          </div>}

          {deleteTicket && <div className="ticket__right__icon">
            <IconButton aria-label="delete" className={classes.margin}
              size="medium" onClick={_deleteTicket}>
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          </div>}
        </div>
      </div>
    </div>
  );
};

export default Ticket;
