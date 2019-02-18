import { select } from 'd3';

export default function clearHovered() {
    this.lines
        .filter(function() {
            return !select(this).classed('selected');
        })
        .select('path')
        .each(function(d) {
            select(this).attr(d.attributes);
        });
    this.points
        .filter(function() {
            return !select(this).classed('selected');
        })
        .select('circle')
        .each(function(d) {
            select(this).attr(d.attributes);
            select(this).attr('r', d.radius);
        });
    delete this.hovered_id;
}
