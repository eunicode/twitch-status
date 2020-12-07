# Twitch Online Status Checker

## Description

This web app checks if a Twitch user is currently streaming. 

It fulfills the user stories listed [here](https://learn.freecodecamp.org/coding-interview-prep/take-home-projects/use-the-twitch-json-api/). 

## Demo

Check out the live website here: https://eunicode.github.io/twitch-status/

## Tech stack

- HTML
- CSS
- JavaScript
- Gulp v4

## APIs

- <del>[Twitch API v5](https://dev.twitch.tv/docs/v5/)</del> [Twitch Helix API]()

## Set Up

Install dependencies: `npm install`

In terminal, move to project directory. Run the default gulp command to start the live Browsersync server: `gulp`

Change value of `ept.URL_REDIRECT`

To stop server: `Ctrl + C`
## Lessons learned

- How to use gulp v4 API (gulp.task + gulp.series)
- How to make a responsive single/two-column/three-column layout with media queries and CSS Grid
- How to make a responsive layout without media queries with CSS Grid: `grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); `
- How to make a sticky footer with CSS Grid: `height: 100vh; grid-template-rows: auto 1fr auto;`
- How to make AJAX requests and parse JSON
- How to generate DOM elements from data with vanilla JavaScript
- How to use ES6 modules
- After revist: 
- Implicit code flow authorization (Get access token via authorization endpoint and make API request with header with token)
- How to use async/await
- Create rows the size of its content: `grid-auto-rows: minmax(min-content, max-content);`
- Review how to use default vertical stacking for narrow viewports, and using a media query to switch to horizontal stacking at wider viewports with flexbox
- Review placing items on grid with grid-column-start/end or grid-areas and grid-template areas
## To do

- Add the ability to search for streamers
- Add the ability to add or remove streamers
- Use env file to keep API keys private
- More to do list items [here](https://github.com/eunicode/twitch-status/blob/master/app/js/main.js)
