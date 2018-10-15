export default function clearHighlighted() {
    this.lines
        .filter(function() {
            return Array.from(this.classList).indexOf('selected') < 0;
        })
        .select('path')
        .attr(this.config.line_attributes);
    this.points
        .filter(function() {
            return Array.from(this.classList).indexOf('selected') < 0;
        })
        .select('circle')
        .attr(this.config.point_attributes)
        .attr('r', this.config.marks.find(mark => mark.type === 'circle').radius);
    delete this.hovered_id;
}
