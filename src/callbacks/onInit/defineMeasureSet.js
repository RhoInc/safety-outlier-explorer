import { set } from 'd3';

export default function defineMeasureSet() {
    this.measures = set(this.initial_data.map(d => d[this.config.measure_col]))
        .values()
        .sort();
    this.soe_measures = set(this.initial_data.map(d => d.soe_measure))
        .values()
        .sort();
}
