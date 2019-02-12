import { select } from 'd3';

export default function clearHovered() {
    this.lines
        .filter(function() {
            return !select(this).classed('selected');
        })
        .select('path')
        .each(function(d) {
            d3.select(this).attr(d.attributes);
        });
    this.points
        .filter(function() {
            return !select(this).classed('selected');
        })
        .select('circle')
        .each(function(d) {
            d3.select(this).attr(d.attributes);
            d3.select(this).attr('r', d.radius);
        });
    delete this.hovered_id;
}
