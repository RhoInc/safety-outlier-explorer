export default function checkPointOverlap(d, chart) {
    // Get the position of the clicked point
    const click_x = d3
        .select(this)
        .select('circle')
        .attr('cx');
    const click_y = d3
        .select(this)
        .select('circle')
        .attr('cy');
    const click_r = d3
        .select(this)
        .select('circle')
        .attr('r');
    const click_id = d.values.raw[0][chart.config.id_col];

    // See if any other points overlap
    var overlap_ids = chart.points
        .filter(function(f) {
            const point_id = f.values.raw[0][chart.config.id_col];
            const point_x = d3
                .select(this)
                .select('circle')
                .attr('cx');
            const point_y = d3
                .select(this)
                .select('circle')
                .attr('cy');
            const distance_x2 = Math.pow(click_x - point_x, 2);
            const distance_y2 = Math.pow(click_y - point_y, 2);
            const distance = Math.sqrt(distance_x2 + distance_y2);

            const max_distance = click_r * 2;
            const overlap = distance <= max_distance;
            const diff_id = point_id != click_id;
            return diff_id & overlap;
        })
        .data()
        .map(d => d.values.raw[0][chart.config.id_col]);

    return overlap_ids;
}
