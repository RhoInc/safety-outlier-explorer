export default function defineMeasureData() {
    this.measure_data = this.initial_data.filter(
        d => d[this.config.measure_col] === this.currentMeasure
    );
    this.raw_data = this.measure_data.filter(d => this.config.unscheduled_visits || !d.unscheduled);
    this.filtered_measure_data = this.measure_data.filter(d => {
        let filtered = false;

        this.filters
            .filter(filter => filter.value_col !== this.config.measure_col)
            .forEach(filter => {
                if (filtered === false && filter.val !== 'All')
                    filtered =
                        filter.val instanceof Array
                            ? filter.val.indexOf(d[filter.col]) < 0
                            : filter.val !== d[filter.col];
            });

        return !filtered;
    });
}
