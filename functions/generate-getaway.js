
module.exports = generate_getaway = (req) => {

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
    
    // console.log(DELTA_LON);
    // console.log(DELTA_LAT);

    // [0, 1, 2, ...
    // 10, 11, 12, ...
    // ...
    // ...97, 98, 99]
    //all one array, and each index corresponds with a specific latitude and longitude range

    let lat = MIN_LAT;
    let lon = MIN_LON;
    let arr = new Array(100).fill(0);
    let count = 0;

    for(let i = 0; i < DIV; i++) {
        for(let j = 0; j < DIV; j++) {
            arr[count] = [lat + (DELTA_LAT * Math.random()), lon + (DELTA_LON * Math.random())];
            lon += DELTA_LON;
            count++;
            
        }
        lat += DELTA_LAT;
        lon = MIN_LON;
    }
    
    req.app.locals.getaways = arr;
    req.app.locals.players_nearby = (new Array(arr.length)).fill(0);
    return req.app.locals.getaways;
}