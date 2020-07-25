import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: '90%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Sort = (props) => {

  const {
    onChangeSortType
  } = props;

  const classes = useStyles();
  const [sort, setSort] = useState('');

  const handleChange = (event) => {
    setSort(event.target.value);
  };

  useEffect(() => {
    switch (sort) {
      case 'departEarly':
        onChangeSortType('departEarly')
        break;
      case 'lowToHigh':
        onChangeSortType('lowToHigh')
        break;
      case 'highToLow':
        onChangeSortType('highToLow')
        break;
      case 'selectedAirlines':
        onChangeSortType('selectedAirlines')
        break;
    }
  }, [sort])

  return (
    <>
      <FormControl className={classes.formControl}>
        <InputLabel>Sort</InputLabel>
        <Select
          value={sort}
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