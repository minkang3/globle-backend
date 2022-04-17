const calc_index = require("./calc-index.js");

module.exports = get_players_nearby = (req) => {
    const [latitude, longitude] = get_getaway(req);
    /**
     * assumption: 
     * the getaways array is generated as 
     * [ 1st lat long pair, 2nd lat long pair, ...
     *   10th lat lon pair, ...
     * ...,  100th lat lon, pair ]
     *  where the first section is in the top left square then the next one is to the right, 
     *  until finally the last one is bottom left.
     * Generated like how english is read.
     */

     const index = calc_index( req.app.locals.MAX_LON, req.app.locals.MAX_LAT,
                    req.app.locals.MIN_LON, req.app.locals.MIN_LAT,
                    req.app.locals.DIVISION_FACTOR, req.query.longitude, 
                    req.query.latitude );

     return {
         amount: req.app.locals.players_nearby[index],
         index: index,
         latitude: latitude,
         longitude: longitude
    };
}