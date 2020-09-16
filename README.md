# BudgeTicket
BudgeTicket can find cheap flight tickets with the destination information. The purpose of creating this app is to understand the basics of JavaScript and SPA development with React.js.

# Demo
[https://budgeticket.firebaseapp.com/](https://budgeticket.firebaseapp.com/)  

Trial account
- ID: budgeticket 
- Password: foobar 

# Features
![Screenshot](https://otanitoma.com/images/works/budgeticket-1.gif)  
Text forms have autocomplete function to input accurate airport name. Also, datepicker components have the validation to check the departure date is before the return date.

![Screenshot](https://otanitoma.com/images/works/budgeticket-2.gif)  
The data from Skyscanner API is stored in Redux store. Users can filter or sort results by departure date, price, and airlines.

# Technology Used
* React
* Redux (re-ducks design pattern)
* Firebase
* Material-UI

# API
* [Skyscanner Flight Search](https://rapidapi.com/skyscanner/api/skyscanner-flight-search/details) 
* [Google Maps](https://developers.google.com/maps/documentation) 
* [Unsplash Image](https://unsplash.com/developers)

# Installation

1. Clone this repository

```bash
$ git clone git@github.com:OtaniToma/budgeticket.git
```

2. Go into the repository

```bash
$ cd budgeticket
```

3. Install dependencies

```bash
$ npm i
```

4. Create .env file on root directory

```.env
# Firebase
REACT_APP_DEV_API_KEY="****************"
REACT_APP_DEV_MESSAGING_SENDER_ID="****************"
REACT_APP_DEV_APP_ID="****************"

# Geocoding
REACT_APP_DEV_GEOCODING_API_KEY="****************"
```

4. Run the app

```bash
$ npm start
```
