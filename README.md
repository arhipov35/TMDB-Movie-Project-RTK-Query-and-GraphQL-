# Getting Started with TMDB Movie
Install Dependencies
Run the following command to install all necessary dependencies:
# Fist `npm i`

# Create two environment files: .env and .env.local. Add the following code to each file, replacing placeholders with your actual API details.
# .env file:
REACT_APP_URL="https://api.themoviedb.org"

`link on - http://auth0.com`
REACT_APP_AUTH0_DOMAIN=AUTH0-DOMAIN
REACT_APP_AUTH0_CLIENT_ID=AUTH0-CLIENT-ID
REACT_APP_AUTH0_CALLBACK_URL=http://localhost:3000/callback

REACT_APP_AUTH0_AUDIENCE=AUTH0-API-AUDIENCE
REACT_APP_AUTH0_PROTECTED_API_URL=http://localhost:6060 - 

# .env.local file (replace with your actual values):
REACT_APP_TOKEN=YOUR_TOKEN
REACT_APP_AUTH0_DOMAIN=YOUR_AUTH0_DOMAIN
REACT_APP_AUTH0_CLIENT_ID=YOUR_AUTH0_CLIENT_ID
REACT_APP_AUTH0_AUDIENCE=YOUR_AUTH0_AUDIENCE - for access token if you need

### `npm start`
This will open your application at http://localhost:3000 in the browser.

The page will reload if you make edits, and you will also see any lint errors in the console.

### `npm test`
To launch the test runner in interactive watch mode, run

### `npm run build`

Builds the app for production to the `build` folder.
