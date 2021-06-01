export default function addVariables() {
    const ordinalTimeSettings = this.config.time_cols.find(time_col => time_col.type === 'ordinal');

    this.raw_data.forEach(d => {
        //Concatenate unit to measure if provided.
        d.soe_measure = d.hasOwnProperty(this.config.unit_col)
            ? `${d[this.config.measure_col]} (${d[this.config.unit_col]})`
            : d[this.config.measure_col];

        //Identify unscheduled visits.
        d.unscheduled = false;
        if (ordinalTimeSettings) {
            if (this.config.unscheduled_visit_values)
                d.unscheduled =
                    this.config.unscheduled_visit_values.indexOf(d[ordinalTimeSettings.value_col]) >
                    -1;
            else if (this.config.unscheduled_visit_regex)
                d.unscheduled = this.config.unscheduled_visit_regex.test(
                    d[ordinalTimeSettings.value_col]
                );
        }

        //Add placeholder variable for non-grouped comparisons.
        d.soe_none = 'All Participants';
    });
}
