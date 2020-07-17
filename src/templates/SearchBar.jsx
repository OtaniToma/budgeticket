import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { searchFlights } from "../reducks/flights/operations";
import { Button } from "../components/atoms";
import { SelectBox, SelectDate } from "../components/atoms";

const airports = [
  {
    value: "YVR",
    label: "Vancouver",
  },
  {
    value: "SEA",
    label: "Seattle",
  },
  {
    value: "SFO",
    label: "San Francisco",
  },
  {
    value: "LAX",
    label: "Los Angeles",
  },
];

const currencies = [
  {
    value: "CAD",
    label: "CAD",
  },
  {
    value: "USD",
    label: "USD",
  },
  {
    value: "JPY",
    label: "JPY",
  },
];

const getToday = new Date(),
      todayYear = getToday.getFullYear(),
      todayMonth = ("0" + (getToday.getMonth() + 1)).slice(-2),
      todayDay = ("0" + (getToday.getDate())).slice(-2),
      today = todayYear + '-' + todayMonth + '-' + todayDay;

const getAWeekLater = new Date(getToday.getTime() + 7 * 24 * 60 * 60 * 1000),
      aWeekLaterYear = getAWeekLater.getFullYear(),
      aWeekLaterMonth = ("0" + (getAWeekLater.getMonth() + 1)).slice(-2),
      aWeekLaterDay = ("0" + (getAWeekLater.getDate())).slice(-2),
      aWeekLater = aWeekLaterYear + '-' + aWeekLaterMonth + '-' + aWeekLaterDay;

const getTwoWeeksLater = new Date(getToday.getTime() + 14 * 24 * 60 * 60 * 1000),
      twoWeeksLaterYear = getTwoWeeksLater.getFullYear(),
      twoWeeksLaterMonth = ("0" + (getTwoWeeksLater.getMonth() + 1)).slice(-2),
      twoWeeksLaterDay = ("0" + (getTwoWeeksLater.getDate())).slice(-2),
      twoWeeksLater = twoWeeksLaterYear + '-' + twoWeeksLaterMonth + '-' + twoWeeksLaterDay;

const SearchBar = () => {
  const dispatch = useDispatch();

  const [originAirport, setOriginAirport] = useState("YVR");
  const [destinationAirport, setDestinationAirport] = useState("SFO");
  const [currency, setCurrency] = useState("CAD");
  const [todayDate, setTodayDate] = useState(today);
  const [departDate, setDepartDate] = useState(aWeekLater);
  const [returnDate, setReturnDate] = useState(twoWeeksLater);

  useEffect(() => {
    if (returnDate <= departDate) {
      alert('Please select the departure date before the return date.');
    }
  }, [departDate])

  useEffect(() => {
    if (departDate > returnDate) {
      alert('Please select the departure date before the return date.');
    }
  }, [returnDate])

  return (
    <>
      <form>
        <SelectBox
          value={originAirport}
          options={airports}
          label={'From'}
          select={setOriginAirport}
        />
        <SelectBox
          value={destinationAirport}
          options={airports}
          label={'To'}
          select={setDestinationAirport}
        />
        <SelectBox
          value={currency}
          options={currencies}
          label={'Currency'}
          select={setCurrency}
        />
        <SelectDate
          label={'Depart'}
          defaultValue={departDate}
          select={setDepartDate}
          minDate={todayDate}
        />
        <SelectDate
          label={'Return'}
          defaultValue={returnDate}
          select={setReturnDate}
          minDate={todayDate}
        />
        <Button
          onClick={() =>
            dispatch(
              searchFlights({ originAirport, destinationAirport, currency, departDate, returnDate })
            )
          }
          label={"Search"}
          color={"primary"}
        />
      </form>
    </>
  );
};

export default SearchBar;
