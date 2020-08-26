import React, {useState, useCallback} from 'react';
import Ticket from '../components/organisms/Ticket';
import AirlineLogos from '../constants/airlineLogos.json';
import {useDispatch} from 'react-redux';
import {push} from 'connected-react-router';
import {FirebaseTimestamp} from '../firebase/index';
import {addTicketToLiked, confirmTicket} from '../reducks/users/operations';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const Tickets = (props) => {
  const dispatch = useDispatch();

  const {
    carriers,
    currencies,
    places,
    quotes,
  } = props;

  const carriersToShow = {};
  carriers.forEach((carrier) => {
    carriersToShow[carrier.CarrierId] = carrier.Name;
  });

  const logosToShow = {};
  const airlinesWithLogo = [];
  carriers.forEach((carrier) => {
    AirlineLogos.forEach((airline) => {
      if (carrier.Name === airline.name) {
        logosToShow[carrier.Name] = airline.logo;
        airlinesWithLogo.push(carrier.Name);
      }
    });
  });

  carriers.map((carrier) => {
    if (!airlinesWithLogo.includes(carrier.Name)) {
      logosToShow[carrier.Name] = 'https://images.kiwi.com/airlines/64x64/airlines.png';
    }
    return true;
  });


  const _likeTicket = ({
    id, price, currencies, direct, departAirportCode, arriveAirportCode,
    departAirportName, arriveAirportName,
    outboundCarriers, inboundCarriers, outboundCarriersLogo, inboundCarriersLogo,
    outboundDepartureDate, inboundDepartureDate,
  }) => {
    const timestamp = FirebaseTimestamp.now();
    dispatch(addTicketToLiked({
      added_at: timestamp,
      id: id,
      price: price,
      currencies: currencies,
      direct: direct,
      departAirportCode: departAirportCode,
      arriveAirportCode: arriveAirportCode,
      departAirportName: departAirportName,
      arriveAirportName: arriveAirportName,
      outboundCarriers: outboundCarriers,
      inboundCarriers: inboundCarriers,
      outboundCarriersLogo: outboundCarriersLogo,
      inboundCarriersLogo: inboundCarriersLogo,
      outboundDepartureDate: outboundDepartureDate,
      inboundDepartureDate: inboundDepartureDate,
    }));
  };

  const _confirmTicket = ({
    id, price, currencies, direct, departAirportCode, arriveAirportCode,
    departAirportName, arriveAirportName,
    outboundCarriers, inboundCarriers, outboundCarriersLogo, inboundCarriersLogo,
    outboundDepartureDate, inboundDepartureDate,
  }) => {
    const timestamp = FirebaseTimestamp.now();
    dispatch(confirmTicket({
      added_at: timestamp,
      id: id,
      price: price,
      currencies: currencies,
      direct: direct,
      departAirportCode: departAirportCode,
      arriveAirportCode: arriveAirportCode,
      departAirportName: departAirportName,
      arriveAirportName: arriveAirportName,
      outboundCarriers: outboundCarriers,
      inboundCarriers: inboundCarriers,
      outboundCarriersLogo: outboundCarriersLogo,
      inboundCarriersLogo: inboundCarriersLogo,
      outboundDepartureDate: outboundDepartureDate,
      inboundDepartureDate: inboundDepartureDate,
    }));
  };

  // Message
  const toLikedList = useCallback(() =>
    dispatch(push('/user/liked')), [dispatch]);

  const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };
  const [open, setOpen] = useState(false);

  const showMessage = (props) => {
    setOpen(true);
  };

  const closeMessage = () => {
    setOpen(false);
  };

  return (
    <>
      {quotes &&
        quotes.map((quote) => {
          return (
            <Ticket
              key={quote.QuoteId}
              id={quote.QuoteId}
              currencies={currencies[0]}
              price={quote.MinPrice.toLocaleString()}
              direct={quote.Direct}
              departAirportCode={places[1].IataCode}
              arriveAirportCode={places[0].IataCode}
              departAirportName={places[1].Name}
              arriveAirportName={places[0].Name}
              outboundCarriers={carriersToShow[quote.OutboundLeg.CarrierIds]}
              inboundCarriers={carriersToShow[quote.InboundLeg.CarrierIds]}
              outboundCarriersLogo={logosToShow[carriersToShow[quote.OutboundLeg.CarrierIds]]}
              inboundCarriersLogo={logosToShow[carriersToShow[quote.InboundLeg.CarrierIds]]}
              outboundDepartureDate={quote.OutboundLeg.DepartureDate.substring(0, 10).substring(5, 10)}
              inboundDepartureDate={quote.InboundLeg.DepartureDate.substring(0, 10).substring(5, 10)}
              likeTicket={_likeTicket}
              confirmTicket={_confirmTicket}
              showMessage={showMessage}
              closeMessage={closeMessage}
            />
          );
        })
      }

      <Snackbar open={open} autoHideDuration={6000} onClose={closeMessage}>
        <Alert onClose={closeMessage} severity="success">
          Added to <strong onClick={toLikedList}>liked list</strong>.
        </Alert>
      </Snackbar>
    </>
  );
};

export default Tickets;
