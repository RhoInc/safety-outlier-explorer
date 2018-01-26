import '../util/object-assign';
import { extent } from 'd3';
import removeUnscheduledVisits from './setXdomain/removeUnscheduledVisits';

export default function setXdomain() {
    this.config.time_settings = this.config.time_cols
        .filter(time_col => time_col.value_col === this.config.x.column)
        .pop();
    Object.assign(this.config.x, this.config.time_settings);
    if (this.config.x.type === 'ordinal') this.config.x.domain = this.config.x.order;
    else this.config.x.domain = extent(this.measure_data, d => +d[this.config.x.column]);

    //Remove unscheduled visits from x-domain if x-type is ordinal.
    if (this.config.x.type === 'ordinal') removeUnscheduledVisits.call(this);
}
