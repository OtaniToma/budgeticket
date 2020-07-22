import React, { useEffect, useState } from "react";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import AirportsData from '../../reducks/flights/airports.json'

const AutocompleteInput = (props) => {
  const {
    select,
    label
  } = props;

  const onTagsChange = (event, values) => {
    if (values === null) {
      return false;
    }
    select(values.code);
  }

  return (

    <Autocomplete
      id="combo-box-demo"
      options={AirportsData}
      getOptionLabel={(option) => option.name}
      style={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label={label} variant="outlined" />}
      onChange={onTagsChange}
    />

  );
};

export default AutocompleteInput;
