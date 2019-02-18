// Takes a webcharts object creates a text annotation giving the
// number and percentage of observations shown in the current view
//
// inputs:
// - chart - a webcharts chart object
// - selector - css selector for the annotation
// - id_unit - a text string to label the units in the annotation (default = "participants")
import { set, format, select } from 'd3';

export default function updateParticipantCount(chart, selector, id_unit) {
    //count the number of unique ids in the current chart and calculate the percentage
    var currentObs = set(
        chart.filtered_data.map(function(d) {
            return d[chart.config.id_col];
        })
    ).values().length;
    var percentage = format('0.1%')(currentObs / chart.populationCount);

    //clear the annotation
    var annotation = select(selector);
    select(selector)
        .selectAll('*')
        .remove();

    //update the annotation
    var units = id_unit ? ' ' + id_unit : ' participant(s)';
    annotation.text(
        '\n' + currentObs + ' of ' + chart.populationCount + units + ' shown (' + percentage + ')'
    );
}
