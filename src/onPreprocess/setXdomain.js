import '../util/object-assign';
import { extent } from 'd3';

export default function setXdomain() {
    this.config.time_settings = this.config.time_cols
        .filter(time_col => time_col.value_col === this.config.x.column)
        .pop();
    Object.assign(this.config.x, this.config.time_settings);
}
