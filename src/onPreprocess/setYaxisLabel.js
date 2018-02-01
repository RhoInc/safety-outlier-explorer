export default function setYaxisLabel() {
    this.config.y.label =
        this.currentMeasure +
        (this.config.unit_col && this.measure_data[0][this.config.unit_col]
            ? ` (${this.measure_data[0][this.config.unit_col]})`
            : '');
}
