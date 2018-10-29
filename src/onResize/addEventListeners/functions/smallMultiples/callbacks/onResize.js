import adjustTicks from '../../../../adjustTicks';
import rangePolygon from './onResize/rangePolygon';

export default function onResize() {
    this.multiples.chart.on('resize', function() {
        //Resize text manually.
        this.wrap.select('.wc-chart-title').style('font-size', '12px');
        this.svg.selectAll('.axis .tick text').style('font-size', '10px');

        //Draw normal range.
        if (this.filtered_data.length) rangePolygon.call(this);

        //Axis tweaks
        this.svg
            .select('.x.axis')
            .select('.axis-title')
            .remove();

        //Delete legend.
        this.legend.remove();

        //Rotate ticks.
        adjustTicks.call(this);
    });
}
