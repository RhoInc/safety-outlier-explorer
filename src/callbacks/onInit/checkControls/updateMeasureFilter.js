export default function updateMeasureFilter() {
    this.measure = {};
    const measureInput = this.controls.config.inputs.find(input => input.label === 'Measure');
    if (
        this.config.start_value &&
        this.soe_measures.indexOf(this.config.start_value) < 0 &&
        this.measures.indexOf(this.config.start_value) < 0
    ) {
        measureInput.start = this.soe_measures[0];
        console.warn(
            `${this.config.start_value} is an invalid measure. Defaulting to ${measureInput.start}.`
        );
    } else if (this.config.start_value && this.soe_measures.indexOf(this.config.start_value) < 0) {
        measureInput.start = this.soe_measures[this.measures.indexOf(this.config.start_value)];
        console.warn(
            `${this.config.start_value} is missing the units value. Defaulting to ${measureInput.start}.`
        );
    } else measureInput.start = this.config.start_value || this.soe_measures[0];
}
