import React from "react";
import TextField from "@material-ui/core/TextField";

const TextInput = (props) => {
  const {
    defaultValue,
    fullWidth,
    label,
    multiline,
    required,
    rows,
    value,
    type,
    onChange,
  } = props;

  return (
    <TextField
      defaultValue={defaultValue}
      fullWidth={fullWidth}
      label={label}
      margin="dense"
      multiline={multiline}
      required={required}
      rows={rows}
      value={value}
      type={type}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default TextInput;
