import { set } from 'd3';

export default function captureMeasures() {
    this.measures = set(this.initial_data.map(d => d.measure_unit))
        .values()
        .sort();
}
