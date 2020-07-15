import React from 'react'
import TextField from '@material-ui/core/TextField'

const TextInput = (props) => {

  const { fullWidth, label, multiline, required, rows, value, type, onChange } = props;

  return (
    <TextField
      fullWidth={fullWidth}
      label={label}
      margin="dense"
      multiline={multiline}
      required={required}
      rows={rows}
      value={value}
      type={type}
      onChange={onChange}
    />
  )
}

export default TextInput