export default function onLayout() {
    this.multiples.chart.on('layout', function() {
        //Define multiple styling.
        this.wrap.style('display', 'block');
        this.wrap
            .selectAll('.wc-chart-title')
            .style('display', 'block')
            .style('border-top', '1px solid #eee');
        this.wrap.selectAll('.wc-chart').style('padding-bottom', '2px');

        //Set y-label to measure unit.
        this.config.y.label = '';

        //Outline currently selected measure.
        //if (this.filters[0].val === this.parent.safetyOutlierExplorer.measure.current)
        //    this.wrap
        //        .select('.wc-chart-title')
        //        .append('span')
        //        .html(' &#9432;')
        //        .style({
        //            'font-weight': 'bold',
        //            'cursor': 'default',
        //        })
        //        .attr('title', 'Currently selected measure');
    });
}
