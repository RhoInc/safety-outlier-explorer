export default function rendererSettings() {
    return {
        //participant
        id_col: 'USUBJID',
        details: [
            { value_col: 'AGE', label: 'Age' },
            { value_col: 'SEX', label: 'Sex' },
            { value_col: 'RACE', label: 'Race' }
        ],

        //timing
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
                order_col: 'DY',
                order: null,
                rotate_tick_labels: false,
                vertical_space: 0
            }
        ],
        visits_without_data: false,
        unscheduled_visits: false,
        unscheduled_visit_pattern: '/unscheduled|early termination/i',
        unscheduled_visit_values: null, // takes precedence over unscheduled_visit_pattern

        //measure
        measure_col: 'TEST',
        start_value: null,
        unit_col: 'STRESU',

        //result
        value_col: 'STRESN',

        //normal range
        normal_col_low: 'STNRLO',
        normal_col_high: 'STNRHI',
        normal_range_method: 'LLN-ULN',
        normal_range_sd: 1.96,
        normal_range_quantile_low: 0.05,
        normal_range_quantile_high: 0.95,

        //filters
        filters: null,

        //marks
        line_attributes: {
            stroke: 'black',
            'stroke-width': 0.5,
            'stroke-opacity': 0.75
        },
        point_attributes: {
            stroke: '#1f78b4',
            'stroke-width': 0.5,
            'stroke-opacity': 1,
            radius: 3,
            fill: '#1f78b4',
            'fill-opacity': 0.2
        },
        tooltip_cols: null,
        custom_marks: null,

        //multiples
        multiples_sizing: {
            width: 300,
            height: 100
        }
    };
}
