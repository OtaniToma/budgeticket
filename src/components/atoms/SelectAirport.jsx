import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import AirportsData from 'airport-data';

const AutocompleteInput = (props) => {
  const {
    select,
    label,
    defaultValue,
  } = props;

  const onTagsChange = (event, values) => {
    if (values === null) {
      return false;
    }
    select(values.iata);
  };

  return (
    <Autocomplete
      id="combo-box-demo"
      options={AirportsData}
      getOptionLabel={(option) => `${option.name} (${option.iata})`}
      defaultValue={defaultValue}
      renderInput={(params) => <TextField {...params} label={label} variant="outlined" />}
      onChange={onTagsChange}
      autoComplete={true}
      autoHighlight={true}
      style={{width: '100%'}}
    />
  );
};

export default AutocompleteInput;
