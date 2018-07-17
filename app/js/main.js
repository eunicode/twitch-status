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

// Check if user is online
function getStatus(user) {
  let request;
  let response;

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
        status = "Account closed";

      } else {
        status = response.stream !== null ? "online" : "offline";
        console.log("status: ", status);
      }
    }
  };

  // 3. Call send() to send the request to the server
  request.send();
}

let status;

getStatus(users[0]);