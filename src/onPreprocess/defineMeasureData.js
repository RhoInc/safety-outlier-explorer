export default function defineMeasureData() {
    this.measure_data = this.initial_data.filter(
        d => d[this.config.measure_col] === this.currentMeasure
    );
    this.raw_data = this.measure_data.filter(d => this.config.unscheduled_visits || !d.unscheduled);
}
