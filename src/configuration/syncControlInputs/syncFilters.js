export default function syncFilters(controlInputs, settings) {
    settings.filters.forEach((filter, i) => {
        filter.type = 'subsetter';
        controlInputs.splice(2 + i, 0, filter);
    });
}
