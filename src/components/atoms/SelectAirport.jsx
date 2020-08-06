import React from "react";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import AirportsData from 'airport-data'

const AutocompleteInput = (props) => {
  const {
    select,
    label
  } = props;

  const onTagsChange = (event, values) => {
    if (values === null) {
      return false;
    }
    select(values.iata);
  }
  
  return (
    <Autocomplete
      id="combo-box-demo"
      options={AirportsData}
      getOptionLabel={(option) => option.name}
      style={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label={label} variant="outlined" />}
      onChange={onTagsChange}
      autoComplete={true}
      autoHighlight={true}
      getOptionLabel={(option) => `${option.name} (${option.iata})`}
    />
  );
};

export default AutocompleteInput;
