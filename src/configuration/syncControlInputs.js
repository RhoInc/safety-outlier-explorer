export default function syncControlInputs(controlInputs, settings) {
    const xAxisControl = controlInputs.find(d => d.label === 'X-axis');
    xAxisControl.values = settings.time_cols.map(d => d.value_col);

    if (settings.filters) {
        settings.filters.forEach(function(d, i) {
            const thisFilter = {
                type: 'subsetter',
                value_col: d.value_col ? d.value_col : d,
                label: d.label ? d.label : d.value_col ? d.value_col : d
            };
            //add the filter to the control inputs (as long as it isn't already there)
            var current_value_cols = controlInputs
                .filter(f => f.type == 'subsetter')
                .map(m => m.value_col);
            if (current_value_cols.indexOf(thisFilter.value_col) == -1)
                controlInputs.splice(4 + i, 0, thisFilter);
        });
    }

    //Sync group control.
    const groupControl = controlInputs.find(controlInput => controlInput.label === 'Group by');
    groupControl.start = settings.groups.find(group => group.value_col === settings.color_by).label;
    groupControl.values = settings.groups.map(group => group.label);

    //Remove unscheduled visit control if unscheduled visit pattern is unscpecified.
    if (
        !settings.unscheduled_visit_regex &&
        !(
            Array.isArray(settings.unscheduled_visit_values) &&
            settings.unscheduled_visit_values.length
        )
    )
        controlInputs.splice(
            controlInputs.map(controlInput => controlInput.label).indexOf('Unscheduled Visits'),
            1
        );

    return controlInputs;
}
