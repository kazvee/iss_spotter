const request = require('request');

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = (callback) => {

  // Fetch IP address from JSON API
  request('https://api.ipify.org?format=json', (error, response, body) => {

    // Error can be set if invalid domain, user is offline, etc.
    if (error) {
      callback(`👾 ${error}`, null);
      return;
    }

    // If non-200 status, assume server error
    if (response.statusCode !== 200) {
      callback(Error(`👽 Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }

    // If successful response, returns user's IP address as a string
    const ip = JSON.parse(body).ip;
    callback(null, ip);

  });

};

/**
 * Makes a single API request to retrieve the lat/lng for a given IPv4 address.
 * Input:
 *   - The ip (ipv4) address (string)
 *   - A callback (to pass back an error or the lat/lng object)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The lat and lng as an object (null if error). Example:
 *     { latitude: '49.27670', longitude: '-123.13000' }
 */
const fetchCoordsByIP = (ip, callback) => {
  request(`http://ipwho.is/${ip}`, (error, response, body) => {

    if (error) {
      callback(`👾 ${error}`, null);
      return;
    }

    // Parse the returned body so we can check its information
    const parsedBody = JSON.parse(body);

    // Check if `success` is true or not
    if (!parsedBody.success) {
      const message = `Success status was ${parsedBody.success}! 👽 Server message says: ${parsedBody.message} when fetching for IP ${parsedBody.ip}`;
      callback(Error(message), null);
      return;
    }

    // If successful response, returns user's coordinates as an object
    const { latitude, longitude } = parsedBody;

    callback(null, { latitude, longitude });

  });

};

module.exports = { fetchMyIP, fetchCoordsByIP };