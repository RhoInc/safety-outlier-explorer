export default function highlightSelected() {
    //Add _selected_ class to participant's marks.
    this.marks.forEach(mark => {
        mark.groups.classed('selected', d =>
            mark.type === 'line'
                ? d.values[0].values.raw[0][this.config.id_col] === this.selected_id
                : d.values.raw[0][this.config.id_col] === this.selected_id
        );
    });

    //Update attributes of selected line.
    this.lines
        .filter(d => d.values[0].values.raw[0][this.config.id_col] === this.selected_id)
        .select('path')
        .attr('stroke-width', d => d.attributes['stroke-width'] * 8);

    //Update attributes of selected points.
    this.points
        .filter(d => d.values.raw[0][this.config.id_col] === this.selected_id)
        .select('circle')
        .attr({
            r: d => d.radius,
            stroke: 'black',
            'stroke-width': d => d.attributes['stroke-width'] * 8
        });
}
