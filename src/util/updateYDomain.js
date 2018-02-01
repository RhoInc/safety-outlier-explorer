export function updateYDomain(chart) {
    var yMinSelect = chart.controls.wrap
        .selectAll('.control-group')
        .filter(f => f.option === 'y.domain[0]')
        .select('input');

    var yMaxSelect = chart.controls.wrap
        .selectAll('.control-group')
        .filter(f => f.option === 'y.domain[1]')
        .select('input');

    //switch the values if min > max
    var range = [yMinSelect.node().value, yMaxSelect.node().value].sort(function(a, b) {
        return a - b;
    });
    yMinSelect.node().value = range[0];
    yMaxSelect.node().value = range[1];

    //apply custom domain to the chart
    chart.config.y.domain = range;
    chart.y_dom = range;
}
