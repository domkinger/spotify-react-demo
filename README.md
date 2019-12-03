# spotify-react-demo
Generate song recommendations using the Spotify API and React!

## Instruction to run
* npm install in both the frontend and auth-server directories
* create an app in the Spotify dev portal to retrieve your client secret and id
* enter your client id and secret in lines 16 and 17 of auth-server/authorization_code/app.js
* cd auth-server and run node authorization_code/app.js to start the auth server
* cd frontend and run npm start to boot up the react app

## Instructions for use
* Hit the "Login to Spotify" button to authorize the app with your Spotify account
* Type an artist name and hit enter to generate recommended tracks from the Spotify API
* Enter up to 5 artists to generate recommendations based on their style
* Delete artists using the trash can icon
* Browse recommended tracks by scrolling

## Todo
* Error handling when artist name does not exist (app currently breaks)
* Refine UI/UX
* Add genre and song inputs
* Live search when typing in the input box
* Create Spotify playlist from recommendations
* Cleanup auth server code
* Cleanup frontend code
