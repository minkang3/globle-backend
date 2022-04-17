const axios = require('axios');
require('dotenv').config();

let url = process.env.SERVER_URL;
url = url + '/generate-getaway';
console.log(url);


const data = axios.post(url)
    .then(res => console.log(res.data.data))
    .catch(err => console.error(err));