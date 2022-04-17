const express = require('express');
const get_getaway =  require('./functions/get-getaway.js');
const generate_getaway = require('./functions/generate-getaway.js');
const get_players_nearby =  require('./functions/get-players-nearby.js');
const update_players_nearby = require('./functions/update-players-nearby.js');
const get_pic = require('./functions/get-pic.js');
const cors = require('cors')
require('dotenv').config();

const app = express();
app.use(cors())
const PORT = process.env.PORT;

//we will contain our getaways within ach of these locations
app.locals.MIN_LAT=33.694439;
app.locals.MIN_LON=-118.523533;
app.locals.MAX_LAT=34.108873;
app.locals.MAX_LON=-118.122865;

// this will be how our area is split up both by x and by y, LA is split into a 10x10 grid
app.locals.DIVISION_FACTOR = 10;

//define server wide variables
//these should be parallel arrays, each element corresponds
app.locals.getaways = [];
app.locals.players_nearby = [];

// define how our app deals with queries
app.use(express.json());

// generates our 'getaway' location
// for now, generates random lat and long tuples for an array of 100 locations in LA
app.post('/generate-getaway', (req, res) => {
    console.log('[Post] generating new getaway locations');
    const data = generate_getaway(req);
    res.send( {data} ); 
});

// gets and returns a suitable 'getaway' location to user
// takes user geolocation as parameter and returns suitable getaway
app.get('/get-getaway', (req, res) => {
    console.log('[Get] finding closest getaway location');
    const data = get_getaway(req);
    res.send( {data} );
});

// getting the amount of people currently at the getaway location
// needs to update a global variable 
app.get('/players-nearby', (req, res) => {
    console.log('[Get] find all the nearby players to your local getaway');
    const data = get_players_nearby(req);
    res.send( {data} );
});

// updating the amount of people currently at the getaway location
app.post('/players-nearby', (req, res) => {
    console.log('[Post] update the nearby players for a getaway');
    const data = update_players_nearby(req);
    res.send( {data} );
});

app.get('/picture', async (req, res) => {
    console.log('[Get] find a nearby picture of the location');
    const data = await get_pic(req);
    res.send({ data: data.data });
});

// begin listening on the (local port)
app.listen(PORT, () => {
    generate_getaway({app: app});
    console.log(`Globle Server started on port ${PORT}`);
});