import { set } from 'd3';

export default function removeVisitsWithoutData() {
    if (!this.config.visits_without_data)
        this.config.x.domain = this.config.x.domain.filter(
            visit =>
                set(this.raw_data.map(d => d[this.config.time_settings.value_col]))
                    .values()
                    .indexOf(visit) > -1
        );
}
