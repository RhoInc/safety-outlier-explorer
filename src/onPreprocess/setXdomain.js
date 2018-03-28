import '../util/object-assign';
import { extent } from 'd3';
import removeVisitsWithoutData from './setXdomain/removeVisitsWithoutData';
import removeUnscheduledVisits from './setXdomain/removeUnscheduledVisits';

export default function setXdomain() {
    //Attach the time settings object to the x-axis settings object.
    this.config.time_settings = this.config.time_cols.find(
        time_col => time_col.value_col === this.config.x.column
    );
    Object.assign(this.config.x, this.config.time_settings);

    //When the domain is not specified, it's calculated on data transform.
    if (this.config.x.type === 'linear') delete this.config.x.domain;

    //Remove unscheduled visits from x-domain if x-type is ordinal.
    if (this.config.x.type === 'ordinal') {
        removeVisitsWithoutData.call(this);
        removeUnscheduledVisits.call(this);
    }
}
