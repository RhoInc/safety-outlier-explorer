export default function syncFilters(settings) {
    //recency ranges
    settings.recencyRanges = settings.recency_cutoffs.map(
        (d, i) => (i > 0 ? [settings.recency_cutoffs[i - 1], d] : [0, d])
    );
    settings.recencyRanges.push([
        settings.recency_cutoffs[settings.recency_cutoffs.length - 1],
        null
    ]);

    //recency range categories
    settings.recencyRangeCategories = settings.recency_cutoffs.every(
        recency_range => recency_range % 7 === 0
    )
        ? settings.recencyRanges.map(
              (recencyRange, i) =>
                  i < settings.recencyRanges.length - 1
                      ? `${recencyRange.map(days => days / 7).join('-')} weeks`
                      : `>${recencyRange[0] / 7} weeks`
          )
        : settings.recencyRanges.map(
              (recencyRange, i) =>
                  i < settings.recencyRanges.length - 1
                      ? `${recencyRange.join('-')} days`
                      : `>${recencyRange[0]} days`
          );

    //default filters
    const defaultFilters = [
        {
            value_col: 'queryrecency',
            label: 'Query Recency',
            multiple: true
        },
        {
            value_col: settings.form_col,
            label: 'Form',
            multiple: true
        },
        {
            value_col: settings.site_col,
            label: 'Site',
            multiple: true
        },
        {
            value_col: settings.marking_group_col,
            label: 'Marking Group',
            multiple: true
        },
        {
            value_col: settings.visit_col,
            label: 'Visit/Folder',
            multiple: true
        }
    ];

    //add status group variables to list of filters
    settings.status_groups
        .slice()
        .reverse()
        .forEach(status_group => {
            status_group.multiple = true;
            defaultFilters.unshift(settings.clone(status_group));
        });

    //add custom filters
    settings.filters = settings.arrayOfVariablesCheck(defaultFilters, settings.filters);
}
