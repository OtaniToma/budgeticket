import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { searchFlights } from '../reducks/flights/operations'
import { Button } from '../components/atoms'
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const airports = [
  {
    value: 'YVR',
    label: 'Vancouver',
  },
  {
    value: 'SEA',
    label: 'Seattle',
  },
  {
    value: 'SFO',
    label: 'San Francisco',
  },
  {
    value: 'LAX',
    label: 'Los Angeles',
  },
];

const currencies = [
  {
    value: 'CAD',
    label: 'CAD',
  },
  {
    value: 'USD',
    label: 'USD',
  },
  {
    value: 'JPY',
    label: 'JPY',
  },
];

const SearchBar = () => {
  const dispatch = useDispatch()

  const [originAirport, setOriginAirport] = useState('YVR')
  const [destinationAirport, setDestinationAirport] = useState('SFO')
  const [currency, setCurrency] = useState('CAD')

  const handleChangeOriginAirport = (event) => {
    setOriginAirport(event.target.value)
  };

  const handleChangeDestinationAirport = (event) => {
    setDestinationAirport(event.target.value)
  };

  const handleChangeCurrency = (event) => {
    setCurrency(event.target.value)
  };

  return (
    <>
      <form>
        <TextField
          select
          label="Select"
          value={originAirport}
          onChange={handleChangeOriginAirport}
        >
          {airports.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Select"
          value={destinationAirport}
          onChange={handleChangeDestinationAirport}
        >
          {airports.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Select"
          value={currency}
          onChange={handleChangeCurrency}
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <Button onClick={() => dispatch(searchFlights({ originAirport, destinationAirport, currency }))} label={'検索'} color={'primary'} />
      </form>
    </>
  )
}

export default SearchBar