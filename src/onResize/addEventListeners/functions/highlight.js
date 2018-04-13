import '../../../util/d3-selection-moveToFront';

export default function highlight() {
    //Highlight line and move in front of all other lines.
    this.lines
        .filter(
            d =>
                [this.hovered_id, this.selected_id].indexOf(
                    d.values[0].values.raw[0][this.config.id_col]
                ) > -1
        )
        .moveToFront()
            .select('path')
            .attr(
                'stroke-width',
                this.config.marks.find(mark => mark.type === 'line').attributes['stroke-width'] * 8
            );

    //Highlight points and move in front of all other points.
    this.points
        .filter(
            d =>
                [this.hovered_id, this.selected_id].indexOf(d.values.raw[0][this.config.id_col]) >
                -1
        )
        .moveToFront()
            .select('circle')
            .attr('r', this.config.marks.find(mark => mark.type === 'circle').radius * 1.5)
            .attr('stroke', 'black')
            .attr('stroke-width', 3);
}
