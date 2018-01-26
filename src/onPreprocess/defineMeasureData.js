import { nest } from 'd3';

export default function defineMeasureData() {
    this.measure_data = this.raw_data.filter(
        d => d[this.config.measure_col] === this.currentMeasure
    );
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
    this.nested_measure_data = nest()
        .key(d => d[this.config.x.column])
        .key(d => d[this.config.color_by])
        .rollup(d => d.map(m => +m[this.config.y.column]))
        .entries(this.filtered_measure_data);
}
