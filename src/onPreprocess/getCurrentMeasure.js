export default function getCurrentMeasure() {
    this.previousMeasure = this.currentMeasure;
    this.currentMeasure = this.controls.wrap
        .selectAll('.control-group')
        .filter(d => d.value_col && d.value_col === this.config.measure_col)
        .select('option:checked')
        .text();
}
