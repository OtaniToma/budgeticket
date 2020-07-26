import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import './Ticket.scss';

const useStyles = makeStyles({
  root: {
    minWidth: '100%',
  }
});

const Ticket = (props) => {
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
    setSelectedTicket
  } = props;

  const classes = useStyles();

  const addTicketToCart = () => {
    setSelectedTicket({
      id: id,
      price: price,
      currencies: currencies,
      direct: direct,
      departAirportCode: currencies,
      arriveAirportCode: arriveAirportCode,
      departAirportName: departAirportName,
      arriveAirportName: arriveAirportName,
      outboundCarriers: outboundCarriers,
      inboundCarriers: inboundCarriers,
      outboundCarriersLogo: outboundCarriersLogo,
      inboundCarriersLogo: inboundCarriersLogo,
      outboundDepartureDate: outboundDepartureDate,
      inboundDepartureDate: inboundDepartureDate
    })
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
        <button onClick={addTicketToCart}>Test</button>
      </div>
    </div>
  </div>
  );
};

export default Ticket;
