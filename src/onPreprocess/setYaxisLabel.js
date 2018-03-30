export default function setYaxisLabel() {
    this.config.y.label =
        this.measure.current +
        (this.config.unit_col && this.measure.data[0][this.config.unit_col]
            ? ` (${this.measure.data[0][this.config.unit_col]})`
            : '');
}
