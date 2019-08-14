export default function checkOverlap(d, chart) {
    console.log(chart);

    chart.multiples.container.select('div.overlapNote').remove();
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
    chart.overlap_ids = chart.points
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

    console.log(chart.overlap_ids);

    if (chart.overlap_ids.length) {
        const overlap_div = chart.multiples.container
            .insert('div', '*')
            .attr('class', 'overlapNote');
        overlap_div
            .append('span')
            .html(
                '<b>Note</b>:' +
                    chart.overlap_ids.length +
                    ' points overlap with the clicked point. Click an ID for details:'
            );
        const overlap_ul = overlap_div
            .append('ul')
            .style('list-style', 'none')
            .style('display', 'inline-block');
        overlap_ul
            .selectAll('li')
            .data(chart.overlap_ids)
            .enter()
            .append('li')
            .style('display', 'inline-block')
            .style('padding-right', '.5em')
            .style('color', 'blue')
            .style('text-decoration', 'underline')
            .style('cursor', 'pointer')
            .text(d => d)
            .on('click', function(d) {
                console.log('changing to participant:', d);
            });
    }
}
