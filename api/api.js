const fs = require('fs');

const dataBuffer = fs.readFileSync('api.json');
const JSONdata = dataBuffer.toString();
const apiData = JSON.parse(JSONdata).data;

module.exports = apiData;