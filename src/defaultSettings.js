import merge from './util/merge';

export const rendererSettings = {
    id_col: 'USUBJID',
    time_cols: [
        {
            type: 'ordinal',
            value_col: 'VISIT',
            label: 'Visit',
            order_col: 'VISITNUM',
            order: null,
            rotate_tick_labels: true,
            vertical_space: 100
        },
        {
            type: 'linear',
            value_col: 'DY',
            label: 'Study Day',
            rotate_tick_labels: false,
            vertical_space: 0
        }
    ],
    measure_col: 'TEST',
    unit_col: 'STRESU',
    value_col: 'STRESN',
    normal_col_low: 'STNRLO',
    normal_col_high: 'STNRHI',
    start_value: null,
    filters: null,
    custom_marks: null,
    details: [
        { value_col: 'AGE', label: 'Age' },
        { value_col: 'SEX', label: 'Sex' },
        { value_col: 'RACE', label: 'Race' }
    ],
    multiples_sizing: {
        width: 300,
        height: 100
    },
    visits_without_data: false,
    unscheduled_visits: false,
    unscheduled_visit_pattern: '/unscheduled|early termination/i',
    unscheduled_visit_values: null // takes precedence over unscheduled_visit_pattern
};

export const webchartsSettings = {
    x: {
        column: null, //set in syncSettings()
        type: null, //set in syncSettings()
        behavior: 'raw'
    },
    y: {
        column: null, //set in syncSettings()
        stat: 'mean',
        type: 'linear',
        label: 'Value',
        behavior: 'raw',
        format: '0.2f'
    },
    marks: [
        {
            per: null, //set in syncSettings()
            type: 'line',
            attributes: {
                'stroke-width': 0.5,
                'stroke-opacity': 0.5,
                stroke: '#999',
                'clip-path': 'url(#1)'
            },
            tooltip: null //set in syncSettings()
        },
        {
            per: null, //set in syncSettings()
            type: 'circle',
            radius: 2,
            attributes: {
                'stroke-width': 0.5,
                'stroke-opacity': 0.5,
                'fill-opacity': 1,
                'clip-path': 'url(#1)'
            },
            tooltip: null //set in syncSettings()
        }
    ],
    resizable: true,
    margin: { right: 20 }, //create space for box plot
    aspect: 3
};

export default merge(rendererSettings, webchartsSettings);

// Replicate settings in multiple places in the settings object
export function syncSettings(settings) {
    const time_col = settings.time_cols[0];

    settings.x.column = time_col.value_col;
    settings.x.type = time_col.type;
    settings.x.label = time_col.label;
    settings.x.order = time_col.order;

    settings.y.column = settings.value_col;

    settings.marks[0].per = [settings.id_col, settings.measure_col];
    settings.marks[0].tooltip = `[${settings.id_col}]`;

    settings.marks[1].per = [
        settings.id_col,
        settings.measure_col,
        time_col.value_col,
        settings.value_col
    ];
    settings.marks[1].tooltip = `[${settings.id_col}]:  [${settings.value_col}] [${
        settings.unit_col
    }] at ${settings.x.column} = [${settings.x.column}]`;

    //Add custom marks to settings.marks.
    if (settings.custom_marks) settings.custom_marks.forEach(mark => settings.marks.push(mark));

    //Define margins for box plot and rotated x-axis tick labels.
    if (settings.margin) settings.margin.bottom = time_col.vertical_space;
    else
        settings.margin = {
            right: 20,
            bottom: time_col.vertical_space
        };

    settings.rotate_x_tick_labels = time_col.rotate_tick_labels;

    //Convert unscheduled_visit_pattern from string to regular expression.
    if (
        typeof settings.unscheduled_visit_pattern === 'string' &&
        settings.unscheduled_visit_pattern !== ''
    ) {
        const flags = settings.unscheduled_visit_pattern.replace(/.*?\/([gimy]*)$/, '$1'),
            pattern = settings.unscheduled_visit_pattern.replace(
                new RegExp('^/(.*?)/' + flags + '$'),
                '$1'
            );
        settings.unscheduled_visit_regex = new RegExp(pattern, flags);
    }

    return settings;
}

// Default Control objects
export const controlInputs = [
    { label: 'Measure', type: 'subsetter', start: null },
    { type: 'dropdown', label: 'X-axis', option: 'x.column', require: true },
    { type: 'number', label: 'Lower Limit', option: 'y.domain[0]', require: true },
    { type: 'number', label: 'Upper Limit', option: 'y.domain[1]', require: true },
    { type: 'checkbox', inline: true, option: 'visits_without_data', label: 'Visits without data' },
    { type: 'checkbox', inline: true, option: 'unscheduled_visits', label: 'Unscheduled visits' }
];

// Map values from settings to control inputs
export function syncControlInputs(controlInputs, settings) {
    const labTestControl = controlInputs.find(d => d.label === 'Measure');
    labTestControl.value_col = settings.measure_col;

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

    //Remove unscheduled visit control if unscheduled visit pattern is unscpecified.
    if (!settings.unscheduled_visit_regex)
        controlInputs.splice(
            controlInputs.map(controlInput => controlInput.label).indexOf('Unscheduled visits'),
            1
        );

    return controlInputs;
}
