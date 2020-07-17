import React from "react";
import TextField from "@material-ui/core/TextField";

const SelectDate = (props) => {
  const {
    label,
    defaultValue,
    select,
    minDate
  } = props;

  return (
    <TextField
      onChange={(event) => select(event.target.value)}
      label={label}
      type="date"
      defaultValue={defaultValue}
      InputProps={{ inputProps: { min: minDate } }}
    />
  );
};

export default SelectDate;
