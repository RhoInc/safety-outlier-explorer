export default function controlInputs() {
    return [
        {
            type: 'subsetter',
            value_col: 'soe_measure', // set in syncControlInputs()
            label: 'Measure',
            start: null
        },
        {
            type: 'dropdown',
            options: ['x.column', 'marks.1.per.2'],
            label: 'X-axis',
            require: true
        },
        {
            type: 'number',
            option: 'y.domain[0]',
            label: 'Lower',
            require: true
        },
        {
            type: 'number',
            option: 'y.domain[1]',
            label: 'Upper',
            require: true
        },
        {
            type: 'dropdown',
            option: 'normal_range_method',
            label: 'Method',
            values: ['None', 'LLN-ULN', 'Standard Deviation', 'Quantiles'],
            require: true
        },
        {
            type: 'number',
            option: 'normal_range_sd',
            label: '# Std. Dev.'
        },
        {
            type: 'number',
            label: 'Lower',
            option: 'normal_range_quantile_low'
        },
        {
            type: 'number',
            label: 'Upper',
            option: 'normal_range_quantile_high'
        },
        {
            type: 'checkbox',
            inline: true,
            option: 'visits_without_data',
            label: 'Without Data'
        },
        {
            type: 'checkbox',
            inline: true,
            option: 'unscheduled_visits',
            label: 'Unscheduled'
        },
        {
            type: 'dropdown',
            label: 'Group by',
            options: ['color_by'],
            start: null, // set in ./syncControlInputs.js
            values: null, // set in ./syncControlInputs.js
            require: true
        }
    ];
}
