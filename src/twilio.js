// twilio.js
const Twilio = require('twilio');

const accountSid = 'ACb48230c87344edfe722e881f4d9d550a';
const authToken = '01b18153ae408cb17b34a7f2228f18e5';

const client = new Twilio(accountSid, authToken);

module.exports = client;
