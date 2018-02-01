export default function setInitialMeasure() {
    this.controls.config.inputs.filter(input => input.label === 'Measure')[0].start =
        this.config.start_value || this.measures[0];
}
