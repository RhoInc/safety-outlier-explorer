export default function getCurrentMeasure() {
    this.measure.previous = this.measure.current;
    this.measure.current = this.controls.wrap
        .selectAll('.control-group')
        .filter(d => d.value_col && d.value_col === 'soe_measure')
        .select('option:checked')
        .text();
}
