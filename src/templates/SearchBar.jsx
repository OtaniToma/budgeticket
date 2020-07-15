import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchFlights } from "../reducks/flights/operations";
import { Button } from "../components/atoms";
import { SelectBox } from "../components/atoms";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

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

  return (
    <>
      <form>

        <SelectBox
          value={originAirport}
          options={airports}
          select={setOriginAirport}
        />

        <SelectBox
          value={destinationAirport}
          options={airports}
          select={setDestinationAirport}
        />

        <SelectBox
          value={currency}
          options={currencies}
          select={setCurrency}
        />

        <Button
          onClick={() =>
            dispatch(
              searchFlights({ originAirport, destinationAirport, currency })
            )
          }
          label={"検索"}
          color={"primary"}
        />
      </form>
    </>
  );
};

export default SearchBar;
