import React from 'react';
import StopList from '../molecules/StopList';
import Sort from '../molecules/Sort';
import AirlineList from '../molecules/AirlineList';
import Divider from '@material-ui/core/Divider';
import {getCarriers, getQuotes} from '../../reducks/flights/selectors';
import {useSelector} from 'react-redux';

const Filters = ({setSortType, filterStops, filterAirlines}) => {
  const selector = useSelector((state) => state);

  const carriers = getCarriers(selector);
  const quotes = getQuotes(selector);

  const _setSortType = (props) => {
    setSortType(props);
  };

  const _filterStops = (props) => {
    filterStops(props);
  };

  const _filterAirlines = (props) => {
    filterAirlines(props);
  };

  return (
    <>
      <Sort onChangeSortType={_setSortType} />
      &nbsp;
      <Divider />
      <StopList
        quotes={quotes.default}
        filterStops={_filterStops}
      />
      <Divider />
      <AirlineList
        carriers={carriers}
        filterAirlines={_filterAirlines}
      />
    </>
  );
};

export default Filters;
