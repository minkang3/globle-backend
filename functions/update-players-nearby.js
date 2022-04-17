module.exports = update_players_nearby = (req) => {
    const index = calc_index( req.app.locals.MAX_LON, req.app.locals.MAX_LAT,
        req.app.locals.MIN_LON, req.app.locals.MIN_LAT,
        req.app.locals.DIVISION_FACTOR, req.query.longitude, 
        req.query.latitude );
    
    if (req.query.increment == 'true') {
        req.app.locals.players_nearby[index]++;
    } else if(req.app.locals.players_nearby[index] > 0) {
        req.app.locals.players_nearby[index]--;
    }

    return {
        index: index,
        players_nearby: req.app.locals.players_nearby[index]
    }

}