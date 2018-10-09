export default function highlight() {
    //Highlight line and move in front of all other lines.
    var lines = this.svg
        .selectAll('.line')
        .sort(
            (a, b) =>
                a.key.indexOf(this.selected_id) === 0
                    ? 2
                    : b.key.indexOf(this.selected_id) === 0
                      ? -2
                      : a.key.indexOf(this.hovered_id) === 0
                        ? 1
                        : b.key.indexOf(this.hovered_id) === 0 ? -1 : 0
        );

    lines
        .filter(d => d.values[0].values.raw[0][this.config.id_col] == this.hovered_id)
        .select('path')
        .attr(
            'stroke-width',
            this.config.marks.find(mark => mark.type === 'line').attributes['stroke-width'] * 4
        );

    lines
        .filter(d => d.values[0].values.raw[0][this.config.id_col] == this.selected_id)
        .select('path')
        .attr(
            'stroke-width',
            this.config.marks.find(mark => mark.type === 'line').attributes['stroke-width'] * 8
        );

    //Highlight points and move behind all other points.
    this.svg
        .selectAll('.point')
        .sort(
            (a, b) =>
                a.key.indexOf(this.selected_id) === 0
                    ? -2
                    : b.key.indexOf(this.selected_id) === 0
                      ? 2
                      : a.key.indexOf(this.hovered_id) === 0
                        ? 1
                        : b.key.indexOf(this.hovered_id) === 0 ? -1 : 0
        )
        .filter(
            d =>
                [this.hovered_id, this.selected_id].indexOf(d.values.raw[0][this.config.id_col]) >
                -1
        )
        .select('circle')
        .attr('r', this.config.marks.find(mark => mark.type === 'circle').radius * 1.5)
        .attr('stroke', 'black')
        .attr('stroke-width', 3);
}
