/**
 * This solution to getting the 'getaway' location relative to a current user 
 * takes into account that a user technically in one 'box zone' MAY be closer 
 * to another getaway location in another box zone.
 * 
 * Runs in O(n) time and accounts for a user's surroundings
 * This can be improved to a constant time solution IF we do not account for 
 * the user's surroundings and simply keep them in their starting "box"
 */

module.exports = get_getaway = (req) => {
    const getaways = req.app.locals.getaways;

    const MIN_LAT = req.app.locals.MIN_LAT;
    const MIN_LON = req.app.locals.MIN_LON;
    const MAX_LAT = req.app.locals.MAX_LAT;
    const MAX_LON = req.app.locals.MAX_LON;

    const DIV = req.app.locals.DIVISION_FACTOR

    const LON_DIST = MAX_LON - MIN_LON;
    const LAT_DIST = MAX_LAT - MIN_LAT;

    // Amount lat and lon change between each 'region'
    const DELTA_LON = LON_DIST / DIV;
    const DELTA_LAT = LAT_DIST / DIV;

    // get lat and lon from http request (client side fulfills this correctly)
    const USER_LAT = parseFloat(req.query.latitude);
    const USER_LON = parseFloat(req.query.longitude);
    // console.log(req.query);
    // console.log(USER_LAT);
    // console.log(USER_LON);
    // const USER_LAT = 33.8;
    // const USER_LON = -118.3;

    // Here, I create a box around the user that is size of (2 * delta lat) by (2 * delta lon)
    var lat_start = USER_LAT - (DELTA_LAT);
    var lat_end = USER_LAT + (DELTA_LAT);
    var lon_start = USER_LON - (DELTA_LON);
    var lon_end = USER_LON + (DELTA_LON);

    // Check if any of the search box is outside our limits
    if(lat_start < MIN_LAT) { lat_start = MIN_LAT;}
    if(lat_end > MAX_LAT) {lat_end = MAX_LAT;}
    if(lon_start < MIN_LON) { lon_start = MIN_LON;}
    if(lon_end > MAX_LON) {lon_end = MAX_LON;}

    // console.log(`lat start: ${lat_start} lat end: ${lat_end}`);
    // console.log(`lon_start: ${lon_start} lon end: ${lon_end}`);

    // Finds all potential spots in user's search area
    let pot_spots = []
    for(let i = 0; i < 100; i++) {
        let lat = getaways[i][0];
        let lon = getaways[i][1];
        // console.log(getaways[i]);

        if((lat <= lat_end && lat >= lat_start) && (lon <= lon_end && lon >= lon_start)) {
            pot_spots.push(getaways[i]);
            // console.log(getaways[i]);
        }
    }

    let best_spot;
    let distance = 10;
    let best_distance = 10;
    for(let i=0;i<pot_spots.length;i++) {
        distance = Math.sqrt(Math.pow(pot_spots[i][0] - USER_LAT, 2) + Math.pow(pot_spots[i][1] - USER_LON, 2))
        // console.log(distance);
        if(distance < best_distance) {
            best_distance = distance;
            best_spot = pot_spots[i];
        }
    }

    // console.log('Get Spot');
    // console.log(best_spot);
    return best_spot;
}