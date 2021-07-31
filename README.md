This is the React code base for the App "Senf" (https://senf.koeln/) <br/>
Since we don't want to touch live data, we have set up this as a test environment. 

## 1: Create a Mapbox Account and get an Access Token

To obtain an access token, sign in to https://www.mapbox.com/ and visit Account > Tokens. The token will start with "pk". You may use the default or create another 

## 2: Add a .env file to the Project root containing the following two Variables:

REACT_APP_MAPBOX_ACCESS_TOKEN= Your_Access_token_here
REACT_APP_DB_BASE_URL=https://europe-west1-senf-dev.cloudfunctions.net/api 

Tip: If you already started the React Server before adding these variables you need to restart the react server afterwards 

## 3: Install packages

run `npm install`

## 4: Run project

run `npm start`

## 5: Open it

go to [http://localhost:3000](http://localhost:3000)
