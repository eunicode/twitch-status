// require('dotenv').config();

// const clientID = process.env.TWITCH_CLIENT_ID;
// console.log({ clientID });

import { auth } from "../secrets.js";

// import api from "../api.js";
// const clientID = api.clientID;
// console.log('clientID: ', clientID);

// Bad global variable
const USERS = [
  "freecodecamp",
  "noopkat",
  "funfunfunction",
  "jsthegame",
  "cscareerhackers",
  "riotgames",
  "tfue",
  "myth",
];

// Bad global variable
let ept = {
  CLIENT_ID: auth.clientId,
  URL_STREAM: "https://api.twitch.tv/helix/streams",
  URL_USER: "https://api.twitch.tv/helix/users",
  URL_AUTH: "https://id.twitch.tv/oauth2/authorize",
  URL_REDIRECT: "http://localhost:3000",
  // URL_REDIRECT = 'https://eunicode.github.io/twitch-status/'
  ACCESS_TOKEN: "",
};

// Set login button's link to Twitch login URL
document.querySelector("#a-auth").setAttribute(
  "href",
  // 'https://id.twitch.tv/oauth2/authorize?client_id=' + CLIENT_ID + '&redirect_uri=' + encodeURIComponent(URL_REDIRECT) + '&response_type=token'
  `${ept.URL_AUTH}?client_id=${ept.CLIENT_ID}&redirect_uri=${encodeURIComponent(
    ept.URL_REDIRECT
  )}&response_type=token`
);

// let user = 'ninja'
// let url1 = `${ept.URL_USER}?login=${user}`
// let url2 = `${ept.URL_STREAM}?user_login=${user}`
// Promise.all( [fetchJson(url1), fetchJson(url2) ] ).then( resolvedValue => {
// console.log(resolvedValue)
// buildDom(resolvedValue[0], resolvedValue[1])
// })

// If user chooses to authenticate
// Location.hash returns a string containing a '#' followed by the fragment identifier of the URL
if (document.location.hash) {
  // Get access token from URL
  let accessToken = getAccessToken();
  ept.ACCESS_TOKEN = accessToken; // make access_token "global"

  if (accessToken) {
    // Iterate array and run code for each element
    for (const user of USERS) {
      // let userJson = fetchJson(`${ept.URL_USER}?login=${user}`);
      // let userStatus = fetchJson(`${ept.URL_STREAM}?user_login=${user}`);
      // buildDom(userJson, userStatus);

      let url1 = `${ept.URL_USER}?login=${user}`
      console.log(url1)
      let url2 = `${ept.URL_STREAM}?user_login=${user}`
       Promise.all( [fetchJson(url1), fetchJson(url2)] ).then(resolvedValue => {
        console.log('uh', resolvedValue)
        buildDom(resolvedValue[0], resolvedValue[1])
       } )
      // Promise.all([url1, url2].map(url => fetchJson(url))).then(resolvedValue => buildDom(resolvedValue[0], resolvedValue[1]))

      // fetchJson(`${ept.URL_USER}?login=${user}`).then(
      //   resolvedValue => {
       
      //     buildDom(resolvedValue, {data: []})
      //   }
      // )
      
    }
  }
}

//   // Get access token from URL
// let accessToken = getAccessToken();
  
//   if (accessToken) {
//     ept.ACCESS_TOKEN = accessToken; // make access_token "global"

//     // Iterate array and run code for each element
//     for (const user of USERS) {
//       // let responseJson;

//       fetchJson(user ).then(
//         resolvedValue => {
          
//           buildDom(resolvedValue)
//         }
//       )
//       // responseJson = await fetchJson(user);
//       // buildDom(responseJson);
//     }
//   }

/* -------------------------------------------------------------------------- */
// HELPER FUNCTIONS

function getAccessToken() {
  let parsedHash = new URLSearchParams(window.location.hash.substr(1));
  let accessToken = parsedHash.get("access_token");
  return accessToken;
}

function domLoading() {
  document.querySelector("#main-api").textContent = "Loading";
}

async function fetchJson(url) {
  
  const response = await fetch(
    `${url}`, // resource
    // ept.URL_STREAM + "?user_login=cnstv1994", 
    {
      headers: {          // `init` object
        "Client-ID": ept.CLIENT_ID,
        // Accept: 'application/vnd.twitchtv.v5+json',
        Authorization: `Bearer ${ept.ACCESS_TOKEN}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      `API request failed. HTTP response status code: ${response.status}`
    );
  } else {
    let responseJson = await response.json();
    // console.log(responseJson);
    return responseJson;
  }
}

function buildDom(userData, userStatus) {
  console.log('hi', userData) // Promise pending
  let data = userData.data[0]; // can't read property '0' of undefined 
  
  let userOnlineStatus = userStatus.data[0] !== undefined ? 'live' : 'offline';
  let userUrl = `https://twitch.tv/${data.login}`;
  // let userUrl = `https://twitch.tv/${data.user_name}`;
  let userIcon = data.profile_image_url
  // let userIcon = data.thumbnail_url;
  let userName = data.login
  let userDescription = data.description
  // let userGameTitle = data.title;
  // let userName = data.user_name;

  let main = document.querySelector("#main-api");
  
  main.innerHTML =
    main.innerHTML +
    `<section class="item">
            <img src=${userIcon} alt="user icon" class="item-img">
            <div class="item-right">
                <h3><a href=${userUrl} target="_blank">${userName}</a></h3>
                <p>${userOnlineStatus}</p>
                <p class="item-subtext">${userDescription}</p>
            </div>
            </section>`;
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

/*
Store user access token in local storage */
// DONE
// Sticky footer (in the case of zero users)

/* -------------------------------------------------------------------------- */

/*



https://dev.twitch.tv/docs/authentication

Authentication involves:
1. Registering your app to obtain a client ID and client secret.
2. Getting a token. This includes specifying scopes, the permissions your app requires.
3. Sending the token in your API request, to authenticate API requests.

User access tokens = Authenticate users and allow your app to make requests on their behalf. If your application uses Twitch for login or makes requests in the context of an authenticated user, you need to generate a user access token.

authentication flows
Implicit code flow	= Your app does not use a server, such as a client-side JavaScript app or mobile app. This approach does not require a server that must make requests to the API.
Authorization code flow	= Your application uses a server, can securely store a client secret, and can make server-to-server requests.
Client credentials flow	= You need an app access token.

OAuth implicit code flow
https://dev.twitch.tv/docs/authentication/getting-tokens-oauth#oauth-implicit-code-flow
 */
