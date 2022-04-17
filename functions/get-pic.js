const axios = require('axios');
require('dotenv').config();

const get_getaway = require('./get-getaway.js');

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const URL = process.env.GOOGLE_URL;
const RADIUS = 200; 

if(!GOOGLE_API_KEY){ throw new Error('GOOGLE_API_KEY cannot be undefined'); }

if(!URL){ throw new Error('URL cannot be undefined'); }

function createURL(url, lat, lon, radius, size='400x400', fov=80, head=70, pitch=0) {
    return `${URL}?size=${size}&location=${lat},${lon}&fov=${fov}&heading=${head}&pitch=${pitch}&radius=${radius}&key=${GOOGLE_API_KEY}`;
}

module.exports = get_pic = async (req) => {
    
    const [latitude, longitude] = get_getaway(req);

    const url = createURL(URL, latitude, longitude, RADIUS);

    const config = {
        url: url,
        method: 'get',
        headers: {}
    }

    const response = await axios(config);
    
    // console.log(response);

    return response;

}