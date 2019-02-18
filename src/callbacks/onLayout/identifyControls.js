import { select } from 'd3';

export default function identifyControls() {
    const controlGroups = this.controls.wrap
        .style('padding-bottom', '8px')
        .selectAll('.control-group');

    //Give each control a unique ID.
    controlGroups.attr('id', d => d.label.toLowerCase().replace(' ', '-')).each(function(d) {
        select(this).classed(d.type, true);
    });

    //Give y-axis controls a common class name.
    controlGroups
        .filter(d => ['y.domain[0]', 'y.domain[1]'].indexOf(d.option) > -1)
        .classed('y-axis', true);

    //Give normal range controls a common class name.
    controlGroups
        .filter(
            d =>
                [
                    'normal_range_method',
                    'normal_range_sd',
                    'normal_range_quantile_low',
                    'normal_range_quantile_high'
                ].indexOf(d.option) > -1
        )
        .classed('normal-range', true);

    //Give visit range controls a common class name.
    controlGroups
        .filter(d => ['visits_without_data', 'unscheduled_visits'].indexOf(d.option) > -1)
        .classed('visits', true);
}
