import { testFuncAction } from './actions'

export const searchFlights = () => {
  return async (dispatch) => {
    fetch(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/US/USD/en-US/YVR/HND/2020-08-01/2020-08-31`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-RapidAPI-Host': 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com',
        'X-RapidAPI-Key': '9ada3d4b58mshc9cbd91f5ad4032p1f7811jsn879a30bd12b3'
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        alert('Failed to get the result.');
      });
  }
}

export const testFunc = () => {
  return async(dispatch) => {
    dispatch(testFuncAction());
  }
}