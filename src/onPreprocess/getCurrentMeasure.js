export default function getCurrentMeasure() {
    this.measure.previous = this.measure.current;
    this.measure.current = this.controls.wrap
        .selectAll('.control-group')
        .filter(d => d.value_col && d.value_col === this.config.measure_col)
        .select('option:checked')
        .text();
}
