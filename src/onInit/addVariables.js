export default function addVariables() {
    this.raw_data.forEach(d => {
        d.NONE = 'All Participants'; // placeholder variable for non-grouped comparisons
        d.unscheduled = this.config.unscheduled_visit_values
            ? this.config.unscheduled_visit_values.indexOf(d[this.config.time_settings.value_col]) >
              -1
            : this.config.unscheduled_visit_pattern
              ? this.config.unscheduled_visit_pattern.test(d[this.config.time_settings.value_col])
              : false;
    });
}
