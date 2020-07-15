import React from "react";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

const SelectBox = (props) => {
  const {
    value,
    options,
    select,
    label
  } = props;

  return (
    <TextField
      select
      label={label}
      value={value}
      onChange={(event) => select(event.target.value)}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default SelectBox;
