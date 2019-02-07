import { select } from 'd3';

export default function clearHovered() {
    this.lines
        .filter(function() {
            return !select(this).classed('selected');
        })
        .select('path')
        .attr(this.config.line_attributes);
    this.points
        .filter(function() {
            return !select(this).classed('selected');
        })
        .select('circle')
        .attr(this.config.point_attributes)
        .attr('r', this.config.marks.find(mark => mark.type === 'circle').radius);
    delete this.hovered_id;
}
