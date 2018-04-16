export default function setYaxisLabel() {
    this.config.y.label =
        this.measure.current +
        (this.measure.unit ? ` (${this.measure.data[0][this.config.unit_col]})` : '');
}
