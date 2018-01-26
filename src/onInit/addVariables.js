export default function addVariables() {
    const ordinalTimeSettings = this.config.time_cols
        .filter(time_col => time_col.type === 'ordinal')
        .pop();

    this.raw_data.forEach(d => {
        //Identify unscheduled visits.
        d.unscheduled = false;
        if (ordinalTimeSettings) {
            if (this.config.unscheduled_visit_values)
                d.unscheduled =
                    this.config.unscheduled_visit_values.indexOf(d[ordinalTimeSettings.value_col]) >
                    -1;
            else if (this.config.unscheduled_visit_pattern)
                d.unscheduled = this.config.unscheduled_visit_pattern.test(
                    d[ordinalTimeSettings.value_col]
                );
        }
    });
}
