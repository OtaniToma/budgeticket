import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import './Ticket.scss';
import { auth } from "../../firebase";
import { getIsSignedIn } from "../../reducks/users/selectors";
import { Button } from '../atoms'

const useStyles = makeStyles({
  root: {
    minWidth: '100%',
  }
});

const Ticket = (props) => {
  const classes = useStyles();

  const {
    id,
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
    addTicket
  } = props;

  const selector = useSelector((state) => state);
  const isSignedIn = getIsSignedIn(selector);

  const _addTicket = () => {
    addTicket(props)
  }
  

  return (
  <div key={id} className={"ticket"}>
    <div className="ticket__container">
      <div className="ticket__left">
        <div className="left__container">
          <div className="left__wrapper">
            <div className="left__row1">
              <div className="airline">
                <img src={outboundCarriersLogo} alt={outboundCarriers}/>
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
                <ArrowRightAltIcon style={{ fill: 'darkgrey', fontSize: 16 }} />
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
                <img src={inboundCarriersLogo} alt={inboundCarriers}/>
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
                <ArrowRightAltIcon style={{ fill: 'darkgrey', fontSize: 16 }} />
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
      <div className={direct ? "ticket__right non-stop" : "ticket__right with-stop"}>
        <span className="ticket__right__price">
          {currencies.Symbol} {price}
        </span>
        <br />
        <Button label={'Add to Cart'} color={'primary'} onClick={_addTicket} disabled={isSignedIn ? false : true} />
      </div>
    </div>
  </div>
  );
};

export default Ticket;
