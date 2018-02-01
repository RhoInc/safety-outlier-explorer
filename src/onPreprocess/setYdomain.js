import { extent } from 'd3';

export default function setYdomain() {
    //Define y-domain.
    if (this.currentMeasure !== this.previousMeasure)
        this.config.y.domain = extent(this.measure_data.map(d => +d[this.config.y.column]));
    else if (this.config.y.domain[0] > this.config.y.domain[1])
        // new measure
        this.config.y.domain.reverse();
    else if (this.config.y.domain[0] === this.config.y.domain[1])
        // invalid domain
        this.config.y.domain = this.config.y.domain.map(
            (d, i) => (i === 0 ? d - d * 0.01 : d + d * 0.01)
        ); // domain with zero range
}
