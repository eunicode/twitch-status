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
    let channelName;
    let channelUrl;
    let channelLogo;

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
            channelName = response.display_name;
            channelUrl = response.url;
            channelLogo = response.logo;

            if (status === "online") {
                channelStatus = response.status;
            } else if (status === "offline") {
                channelStatus = "offline";
            } else {
                channelStatus = "closed";
            }
            
            container.innerHTML = container.innerHTML + 
            `<section class="item">
            <img src="https://static-cdn.jtvnw.net/jtv_user_pictures/freecodecamp-profile_image-d9514f2df0962329-300x300.png" width="100px">
            <div class="item-right">
                <h3>USERNAME</h3>
                <p>offline</p>
                <p>description: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
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
// Add ability to search and add/remove users