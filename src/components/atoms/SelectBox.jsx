import React from "react";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

const TextInput = (props) => {
  const {
    value,
    options,
    select
  } = props;

  return (
    <TextField
      select
      label="Select"
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

export default TextInput;
