export default function highlightHovered() {
    //Update attributes of hovered line.
    this.lines
        .filter(d => d.values[0].values.raw[0][this.config.id_col] === this.hovered_id)
        .select('path')
        .attr('stroke-width', this.config.line_attributes['stroke-width'] * 4);

    //Update attributes of hovered points.
    this.points
        .filter(d => d.values.raw[0][this.config.id_col] === this.hovered_id)
        .select('circle')
        .attr({
            r: this.config.point_attributes.radius * 1.25,
            stroke: 'black',
            'stroke-width': this.config.point_attributes['stroke-width'] * 4
        });
}
