export default function syncWebchartsSettings(settings) {
    //y-axis
    settings.y.column = settings.form_col;
    settings.y.sort = settings.alphabetize ? 'alphabetical-ascending' : 'total-descending';
    settings.y.range_band = settings.range_band || 25;

    //mark settings
    settings.marks[0].per[0] = settings.form_col;
    settings.marks[0].split = settings.status_group.value_col;
    settings.marks[0].arrange = settings.bar_arrangement;
    settings.marks[0].tooltip = `[${settings.status_group.value_col}] - $x queries`;

    //stratification
    settings.color_by = settings.status_group.value_col;
    settings.color_dom = settings.status_group.order ? settings.status_group.order.slice() : null;
    settings.colors = settings.status_group.colors;

    //legend
    settings.legend.label = settings.status_group.label;
    settings.legend.order = settings.status_group.order
        ? settings.status_group.order.slice()
        : null;
}
