import { auth } from "../secrets.js";

// Bad global variable
const USERS = [
  "freecodecamp",
  "noopkat",
  "funfunfunction",
  "jsthegame",
  "kentcdodds",
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
  // DEVELOPMENT
  // URL_REDIRECT: "http://localhost:3000",
  // PRODUCTION
  URL_REDIRECT: 'https://eunicode.github.io/twitch-status/',
  ACCESS_TOKEN: "",
  INIT_OBJ: "",
};

// Bad global variable
let nodeDummy = document.querySelector("#main-dummy");
let nodeApi = document.querySelector("#main-api");

// Build dummy grid
sequentialAsyncTaskWrapper(
  // DEVELOPMENT
  // "../data/simulatedDataUser.json",
  // "../data/simulatedDataStream.json",
  // PRODUCTION
  "/data/simulatedDataUser.json", // The file path should be relative to index.html
  "/data/simulatedDataStream.json",
  nodeDummy
);

// Set login button's link to Twitch login URL
document
  .querySelector("#a-auth")
  .setAttribute(
    "href",
    `${ept.URL_AUTH}?client_id=${
      ept.CLIENT_ID
    }&redirect_uri=${encodeURIComponent(ept.URL_REDIRECT)}&response_type=token`
  );

// If user chooses to authenticate, they get a URL like http://localhost:3000/#access_token=11111&scope=&token_type=bearer
// Location.hash returns a string containing a '#' followed by the fragment identifier of the URL
if (document.location.hash) {
  // Get access token from URL
  let accessToken = getAccessToken();
  ept.ACCESS_TOKEN = accessToken; // make access_token "global"

  if (accessToken) {
    // Hide dummy grid
    let section = document.querySelector("#main-dummy");
    let dummyNotice = document.querySelector("#text-dummy-notice");
    hideDom(section);
    hideDom(dummyNotice);

    // Iterate array and run code for each element
    let urlUser = `${ept.URL_USER}?`;
    let urlStream = `${ept.URL_STREAM}?`;

    // Use one API call to get data for multiple users
    for (const user of USERS) {
      urlUser += `&login=${user}`;
      urlStream += `&user_login=${user}`;
    }

    sequentialAsyncTaskWrapper(urlUser, urlStream, nodeApi);
  }
}

async function sequentialAsyncTaskWrapper(urlUser, urlStream, node) {
  // Alternatively, use rest syntax to receive any number of args
  let userData = await fetchJson(urlUser); // Step 1. These are sequential
  let streamData = await fetchJson(urlStream); // Step 2.
  let streamSet = new Set();

  // Create set of online users, O(1) lookup
  for (let streamer of streamData.data) {
    streamSet.add(streamer.user_name.toLowerCase());
  }

  for (let user of userData.data) {
    buildDom(user, streamSet, node);
  }

  // Alternatively, use `await Promise.all(asyncTask1(), asyncTask2())`
}

/* -------------------------------------------------------------------------- */
// HELPER FUNCTIONS

function getAccessToken() {
  let parsedHash = new URLSearchParams(window.location.hash.substr(1)); // Get string after '#'
  let accessToken = parsedHash.get("access_token");
  return accessToken;
}

function domLoadingMessage() {
  // document.querySelector("#main-api").textContent = "Loading";
}

async function fetchJson(url) {
  const response = await fetch(
    `${url}`, // resource
    {
      headers: { // `init` object
        "Client-ID": ept.CLIENT_ID,
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

function buildDom(userData, userStatus, parentNode) {
  let userName = userData.login;
  let userOnlineStatus = userStatus.has(userName.toLowerCase())
    ? "live"
    : "offline";
  let userUrl = `https://twitch.tv/${userData.login}`;
  let userIcon = userData.profile_image_url;
  let userDescription = userData.description;

  parentNode.innerHTML =
    parentNode.innerHTML +
    `<section class="item">
            <img src=${userIcon} alt="user icon" class="item-img">
            <div class="item-right">
                <h3><a href=${userUrl} target="_blank">${userName}</a></h3>
                <p class=${
                  userOnlineStatus === "live" ? "text-online" : "text-offline"
                }>${userOnlineStatus}</p>
                <p class="item-subtext">${userDescription}</p>
            </div>
            </section>`;
}

function hideDom(node) {
  if (!node.classList.contains("hide")) {
    node.classList.add("hide");
  }

  // We need to get rid of .main-grid bc further down the css file, .main-grid sets display to "grid", which overwrites "none"
  if (node.classList.contains("main-grid")) {
    node.classList.remove("main-grid");
  }

  


}

/* -------------------------------------------------------------------------- */

/*
TO DO
Get rid of global variables
Promises
DRY up code with OOJS?
Add BEM classes
Add colored dot to signal if user is online/offline
Add color to username to signal if user is online/offline
Sort online users to the top
Add tabs for offline, online users
Add ability to search and add/remove users

TO DO MORE
Store user access token in local storage 
*/

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

--------------------------------------------------------------------------------
Location: hash
https://developer.mozilla.org/en-US/docs/Web/API/Location/hash

URLSearchParams
https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams

The URLSearchParams interface defines utility methods to work with the query string of a URL.

URLSearchParams.get()
https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/get

--------------------------------------------------------------------------------
Twitch implicit auth example
https://barrycarlyon.github.io/twitch_misc/authentication/implicit_auth/
https://github.com/BarryCarlyon/twitch_misc/blob/master/authentication/implicit_auth/index.html

 */
