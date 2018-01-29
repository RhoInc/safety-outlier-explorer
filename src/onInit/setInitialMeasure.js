export default function setInitialMeasure() {
    this.controls.config.inputs.find(input => input.label === 'Measure').start =
        this.config.start_value || this.measures[0];
}
