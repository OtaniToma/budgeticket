import React, { useState } from "react";
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

const SearchBar = () => {
  const dispatch = useDispatch();

  const [originAirport, setOriginAirport] = useState("YVR");
  const [destinationAirport, setDestinationAirport] = useState("SFO");
  const [currency, setCurrency] = useState("CAD");
  const [departDate, setDepartDate] = useState("2020-08-01");
  const [returnDate, setReturnDate] = useState("2020-08-11");

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
        />
        <SelectDate
          label={'Return'}
          defaultValue={returnDate}
          select={setReturnDate}
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
