const axios = require('axios');
require('dotenv').config();

let url = process.env.SERVER_URL;
url = url + '/players-nearby';

const config = {
    url: url,
    method: 'post',
    params: {
        latitude: 33.9, 
        longitude: -118.2,
        increment: true //switch to false for decrement
    }
}

console.log("config: ")
console.log(config);

const data = axios(config)
    .then(res => { 
        console.log(res.data.data);
    })
    .catch(err => {
        console.error(err);
    });