import insertGrouping from './groupControls/insertGrouping';

export default function groupControls() {
    //Group y-axis controls.
    insertGrouping.call(this, '.y-axis', 'Y-axis');

    //Group filters.
    if (this.filters.length > 1) insertGrouping.call(this, '.subsetter:not(#measure)', 'Filters');

    //Group normal controls.
    insertGrouping.call(this, '.normal-range', 'Normal Range');

    //Group visit controls.
    insertGrouping.call(this, '.visits', 'Visits');
}
