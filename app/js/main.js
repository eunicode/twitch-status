// require('dotenv').config();

// const clientID = process.env.TWITCH_CLIENT_ID;
// console.log({ clientID });

import { auth } from "../secrets.js";

// import api from "../api.js";
// const clientID = api.clientID;
// console.log('clientID: ', clientID);

// Bad global variable
const users = [
  "freecodecamp",
  "noopkat",
  "funfunfunction",
  "jsthegame",
  "cscareerhackers",
  "cowsep",
  "followgrubby",
  "trikslyr"
];

const url = 'https://api.twitch.tv/helix/streams';
const urlauth = 'https://id.twitch.tv/oauth2/authenticate'
// const urlauth = 'https://id.twitch.tv/oauth2/validate'
const CLIENT_ID = auth.clientId
console.log(CLIENT_ID)
const URL_REDIRECT = 'http://localhost:3000'
// const urlredirect = 'https://eunicode.github.io/twitch-status/'
// Example return url https://website.com/#access_token=1111111&scope=&token_type=bearer

// Set form URL 
// How long does this take?
// window.addEventListener('load', (event) => {
//   document.querySelector("#form-auth").setAttribute('action', 
//   // 'google.com'
//   `${urlauth}?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(URL_REDIRECT)}&response_type=token`
//   )
// })
document.querySelector('#a-auth').setAttribute('href',
'https://id.twitch.tv/oauth2/authorize?client_id=' + CLIENT_ID + '&redirect_uri=' + encodeURIComponent(URL_REDIRECT) + '&response_type=token'
// `https://id.twitch.tv/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${URL_REDIRECT}&response_type=token&scope=channel:read:stream_key`
)

// IGNORE CODE BELOW

// If user chose to authenticate
// Location.hash returns a string containing a '#' followed by the fragment identifier of the URL
if (document.location.hash) {
  // Get access token from URL
  let parsedHash = new URLSearchParams(window.location.hash.substr(1));

  if (parsedHash.get('access_token')) {
    let accessToken = parsedHash.get('access_token');
    document.querySelector('#main-api').textContent = 'Loading';

    async function myFetch() {
  const response = await fetch(
    // resource
    url + '?user_login=quackityhq',
    // `init` object
    {
      headers: {
        'Client-ID': CLIENT_ID,
        // Accept: 'application/vnd.twitchtv.v5+json',
        Authorization: `Bearer ${accessToken}`
      }
    }
  )
  
  let responseJson = await response.json()
  console.log(responseJson)
}

myFetch()

  }
}

// async function myFetch() {
//   const response = await fetch(
//     // resource
//     url + '?user_login=quackityhq',
//     // `init` object
//     {
//       headers: {
//         'Client-ID': auth.clientID,
//         // Accept: 'application/vnd.twitchtv.v5+json',
//         Authorization: 'Bearer ' + auth.clientToken
//       }
//     }
//   )
  
//   let response2 = await response.json()
//   console.log(response)
//   console.log(response2)
// }

// myFetch()

// JSON output
// data: Array(1)
// 0:
// game_id: "27471"
// game_name: "Minecraft"
// id: "40807281662"
// language: "en"
// started_at: "2020-12-04T03:56:45Z"
// tag_ids: ["6ea6bca4-4712-4ab9-a906-e3336a9d8039"]
// thumbnail_url: "https://static-cdn.jtvnw.net/previews-ttv/live_user_quackityhq-{width}x{height}.jpg"
// title: "GEORGE HAS JUST BEEN DETHRONED"
// type: "live"
// user_id: "48526626"
// user_name: "QuackityHQ"
// viewer_count: 63548
// __proto__: Object
// length: 1
// __proto__: Array(0)
// pagination: {}




// IGNORE CODE BELOW

// Iterate array and run code for each element
for (const user of users) {
  // actionBundle(user)
}

function actionBundle(user) {
  let main = document.querySelector("main");
  // 1. Check if user is online
  // 2. Get user data
  // 3. Build DOM
}

// function getStatus() {

// }

// function getData() {

// }

// function buildDom() {

// }

// STEP 2
// Check if user is online
function getStatus(user) {
  let request;
  let response;
  let status;

  // Send an HTTP request

  // 1. Create an XMLHttpRequest object with XHR constructor
  request = new XMLHttpRequest();
  console.log("XMLHttpRequest object: ", request);

  // 2. Open a URL. Call open() to initialize new XMLHttpRequest object
  // Get stream information for a specified user
  // https://dev.twitch.tv/docs/v5/reference/streams/#get-stream-by-user
  request.open(
    "GET",
    `https://api.twitch.tv/helix/streams/${user}?client_id=${clientID}`,
    // `https://twitch-proxy.freecodecamp.rocks/streams/${user}`,
    // `https://api.twitch.tv/kraken/streams/${user}?client_id=${clientID}`,
    true // async argument
  );

  // 4. If request (XMLHttpRequest transaction) completes successfully, the callback function will be called.
  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      response = JSON.parse(request.responseText);
      console.log("response: ", response);  

      if (response.stream === undefined) {
        status = "closed";

      } else {
        status = response.stream !== null ? "online" : "offline";
        console.log("status: ", status);
      }
    }

    getChannel(user, status);
  };

  // 3. Call send() to send the request to the server
  request.send();
}

// STEP 3
function getChannel(user, status) {
    let request;
    let response;
    let channelStatus;
    // let channelName;
    let channelUrl;
    let channelLogo;
    let channelGame;

    request = new XMLHttpRequest();

    // https://dev.twitch.tv/docs/v5/reference/channels/#get-channel-by-id
    request.open(
        "GET", 
        `https://api.twitch.tv/helix/channels/${user}?client_id=${clientID}`,
        // `https://api.twitch.tv/kraken/channels/${user}?client_id=${clientID}`,
        true
    );

    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            response = JSON.parse(request.responseText);
            console.log("response: ", response);
            // channelName = response.display_name;
            channelUrl = response.url;
            channelLogo = response.logo;
            channelGame = response.game;

            if (status === "online") {
                channelStatus = `online: ${response.status}`;
            } else if (status === "offline") {
                channelStatus = "offline";
            } else {
                channelStatus = "closed";
            }
            
            main.innerHTML = main.innerHTML + 
            `<section class="item">
            <img src=${channelLogo} alt="logo" class="item-img">
            <div class="item-right">
                <h3><a href=${channelUrl} target="_blank">${user}</a></h3>
                <p>${channelStatus}</p>
                <p class="item-subtext">${channelGame}</p>
            </div>
            </section>`

        }
    }

    request.send();
}

// STEP 1
for (let i = 0; i < users.length; i++) {
    // getStatus(users[i]);
}

/* -------------------------------------------------------------------------- */
// TO DO 
// Get rid of global variables
// Promises
// DRY up code with OOJS?
// Add BEM classes
// Add colored dot to signal if user is online/offline
// Add color to username to signal if user is online/offline
// Sort online users to the top
// Add tabs for offline, online users
// Add ability to search and add/remove users

// DONE
// Sticky footer (in the case of zero users)

/* -------------------------------------------------------------------------- */


 