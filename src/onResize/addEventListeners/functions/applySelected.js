export default function applySelected() {
    this.svg
        .selectAll('.line')
        .filter(d => d.values[0].values.raw[0][this.config.id_col] === this.selected_id)
        .classed('selected', true);
    this.svg
        .selectAll('.point')
        .filter(d => d.values.raw[0][this.config.id_col] === this.selected_id)
        .classed('selected', true);
}
