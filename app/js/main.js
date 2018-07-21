import api from "../api.js";

const clientID = api.clientID;
// console.log('clientID: ', clientID);

const users = [
  "freecodecamp",
  "noopkat",
  "funfunfunction",
  "cowsep",
  "followgrubby",
  "trikslyr"
];

let container = document.querySelector(".container");

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
    `https://api.twitch.tv/kraken/streams/${user}?client_id=${clientID}`,
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
        `https://api.twitch.tv/kraken/channels/${user}?client_id=${clientID}`,
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
            
            container.innerHTML = container.innerHTML + 
            `<section class="item">
            <img src=${channelLogo} alt="logo" width="100px">
            <div class="item-right">
                <h3><a href=${channelUrl} target="_blank">${user}</a></h3>
                <p>${channelStatus}</p>
                <p>${channelGame}</p>
            </div>
            </section>`

        }
    }

    request.send();
}

// STEP 1
for (let i = 0; i < users.length; i++) {
    getStatus(users[i]);
}

// TO DO 
// Get rid of global variables
// Promises
// DRY up code with OOJS?
// Sticky footer (in the case of zero users)
// Add BEM classes
// Add colored dot to signal if user is online/offline
// Add color to username to signal if user is online/offline
// Sort online users to the top
// Add tabs for offline, online users
// Add ability to search and add/remove users