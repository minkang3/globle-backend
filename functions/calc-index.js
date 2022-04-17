module.exports = calc_index = (max_x, max_y, min_x, min_y, div_factor, x, y) => {

    const x_dist = max_x - min_x;
    const y_dist = max_y - min_y;

    const delta_x = x_dist / div_factor;
    const delta_y = y_dist / div_factor;

    const x_idx = Math.floor( (x - min_x) / (delta_x) );
    const y_idx = Math.floor( (y - min_y) / (delta_y) );
    return div_factor*x_idx + y_idx;
}