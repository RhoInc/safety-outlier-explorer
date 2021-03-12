import { set } from 'd3';

export default function syncSettings(settings) {
    const time_col = settings.time_cols[0];

    //handle a string arguments to array settings
    const array_settings = ['filters', 'details', 'tooltip_cols'];
    array_settings.forEach(function(s) {
        if (!(settings[s] instanceof Array))
            settings[s] = typeof settings[s] === 'string' ? [settings[s]] : [];
    });

    //x-axis
    settings.x.column = time_col.value_col;
    settings.x.type = time_col.type;
    settings.x.label = time_col.label;
    settings.x.order = time_col.order;

    //y-axis
    settings.y.column = settings.value_col;

    //lines
    const lines = settings.marks.find(mark => mark.type === 'line');
    lines.per = [settings.id_col, settings.measure_col];
    lines.tooltip = `[${settings.id_col}]`;
    Object.assign(lines.attributes, settings.line_attributes);
    lines.attributes['stroke-width'] = settings.line_attributes['stroke-width'] || 0.5;

    //points
    const points = settings.marks.find(mark => mark.type === 'circle');
    points.per = [settings.id_col, settings.measure_col, time_col.value_col, settings.value_col];
    points.tooltip = `Participant = [${settings.id_col}]\n[${settings.measure_col}] = [${settings.value_col}] [${settings.unit_col}]\n${settings.x.label} = [${settings.x.column}]`;

    //add custom tooltip values
    if (settings.tooltip_cols) {
        settings.tooltip_cols.forEach(function(tooltip) {
            var obj = typeof tooltip == 'string' ? { label: tooltip, value_col: tooltip } : tooltip;
            points.tooltip = points.tooltip + `\n${obj.label} = [${obj.value_col}]`;
        });
    }

    Object.assign(points.attributes, settings.point_attributes);
    points.radius = settings.point_attributes.radius || 3;

    //Add custom marks to settings.marks.
    if (Array.isArray(settings.custom_marks) && settings.custom_marks.length)
        settings.custom_marks.forEach(mark => {
            if (mark instanceof Object) {
                mark.default = false; // distinguish custom marks from default marks
                if (mark.type === 'line')
                    mark.attributes = Object.assign({}, lines.attributes, mark.attributes);
                else if (mark.type === 'circle') {
                    mark.attributes = Object.assign({}, points.attributes, mark.attributes);
                    mark.radius = mark.radius || points.radius;
                }
                settings.marks.push(mark);
            }
        });

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

    //stratification
    const defaultGroup = { value_col: 'soe_none', label: 'None' };
    if (!(settings.groups instanceof Array && settings.groups.length))
        settings.groups = [defaultGroup];
    else
        settings.groups = [defaultGroup].concat(
            settings.groups.map(group => {
                return {
                    value_col: group.value_col || group,
                    label: group.label || group.value_col || group
                };
            })
        );

    //Remove duplicate values.
    settings.groups = set(settings.groups.map(group => group.value_col))
        .values()
        .map(value => {
            return {
                value_col: value,
                label: settings.groups.find(group => group.value_col === value).label
            };
        });

    //Set initial group-by variable.
    settings.color_by = settings.color_by
        ? settings.color_by
        : settings.groups.length > 1
        ? settings.groups[1].value_col
        : defaultGroup.value_col;

    if (settings.color_by !== 'soe_none') {
        delete settings.marks
            .find(mark => mark.type === 'line')
            .attributes
            .stroke;
        delete settings.marks
            .find(mark => mark.type === 'circle')
            .attributes
            .fill;
        delete settings.marks
            .find(mark => mark.type === 'circle')
            .attributes
            .stroke;
    } else {
        Object.assign(
            settings.marks
                .find(mark => mark.type === 'line')
                .attributes,
            settings.line_attributes
        );
        Object.assign(
            settings.marks
                .find(mark => mark.type === 'circle')
                .attributes,
            settings.point_attributes
        );
    }

    //Set initial group-by label.
    settings.legend.label = settings.groups.find(
        group => group.value_col === settings.color_by
    ).label;

    return settings;
}
