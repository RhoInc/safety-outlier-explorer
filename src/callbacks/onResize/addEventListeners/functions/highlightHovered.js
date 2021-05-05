export default function highlightHovered() {
    //Update attributes of hovered line.
    this.lines
        .filter(d => d.values[0].values.raw[0][this.config.id_col] === this.hovered_id)
        .select('path')
        .attr('stroke-width', d => d.attributes['stroke-width'] * 4);

    //Update attributes of hovered points.
    this.points
        .filter(d => d.values.raw[0][this.config.id_col] === this.hovered_id)
        .select('circle')
        .attr({
            r: d => d.radius,
            //stroke: 'black',
            'stroke-width': d => d.attributes['stroke-width'] * 4
        });
}
