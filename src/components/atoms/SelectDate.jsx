import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import format from 'date-fns/format';
import 'date-fns';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    maxWidth: 160,
  },
});

const SelectDate2 = ({select, label, defaultValue}) => {
  const [selectedDate, setSelectedDate] = React.useState(defaultValue);

  const handleDateChange = (date) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    select(formattedDate);
    setSelectedDate(date);
  };

  const classes = useStyles();

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        margin="normal"
        id="date-picker-dialog"
        label={label}
        format="yyyy/MM/dd"
        value={selectedDate}
        onChange={handleDateChange}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
        minDate={new Date()}
        className={classes.root}
      />
    </MuiPickersUtilsProvider>
  );
};

export default SelectDate2;
