const { nextISSTimesForMyLocation } = require('./iss');
const printPassTimes = require('./printPassTimes');
// const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work! ☹️", error);
  }
  // Success, so print out the details
  printPassTimes(passTimes);
});

// Code used for testing

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work! ☹️", error);
//     return;
//   }
//   console.log('It worked! 😀 Returned IP:', ip);
// });

// fetchCoordsByIP('162.245.144.188', (error, coordinates) => {
//   if (error) {
//     console.log("It didn't work! ☹️", error);
//     return;
//   }
//   console.log('It worked! 😀 Returned coordinates:', coordinates);
// });

// const exampleCoords = { latitude: '49.27670', longitude: '-123.13000' };

// fetchISSFlyOverTimes(exampleCoords, (error, passTimes) => {
//   if (error) {
//     console.log("It didn't work! ☹️", error);
//     return;
//   }
//   console.log('It worked! 😀 Returned flyover times:', passTimes);
// });