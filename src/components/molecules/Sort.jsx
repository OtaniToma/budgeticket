import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(0),
    minWidth: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Sort = (props) => {
  const {
    sortType,
    onChangeSortType,
  } = props;

  const classes = useStyles();

  const handleChange = (event) => {
    onChangeSortType(event.target.value);
  };

  return (
    <>
      <FormControl className={classes.formControl}>
        <InputLabel>Sort</InputLabel>
        <Select
          value={sortType}
          onChange={handleChange}
        >
          <MenuItem value={'departEarly'}>Early Departure</MenuItem>
          <MenuItem value={'lowToHigh'}>Low to High</MenuItem>
          <MenuItem value={'highToLow'}>High to Low</MenuItem>
        </Select>
      </FormControl>
    </>
  );
};

export default Sort;
