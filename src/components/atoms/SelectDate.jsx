import React from "react";
import TextField from "@material-ui/core/TextField";

const SelectDate = (props) => {
  const {
    label,
    defaultValue,
    select
  } = props;

  return (
    <TextField
      onChange={(event) => select(event.target.value)}
      label={label}
      type="date"
      defaultValue={defaultValue}
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
};

export default SelectDate;
