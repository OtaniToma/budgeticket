import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    maxWidth: 140,
  },
});

const SelectDate = (props) => {
  const {
    label,
    defaultValue,
    select,
    minDate
  } = props;


const classes = useStyles();

  return (
    <TextField
      onChange={(event) => select(event.target.value)}
      label={label}
      type="date"
      defaultValue={defaultValue}
      InputProps={{ inputProps: { min: minDate } }}
      className={classes.root}
    />
  );
};

export default SelectDate;
