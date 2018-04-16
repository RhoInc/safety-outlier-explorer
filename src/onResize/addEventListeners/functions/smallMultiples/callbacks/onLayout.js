export default function onLayout() {
    this.multiples.on('layout', function() {
        //Define multiple styling.
        this.wrap.style('display', 'block');
        this.wrap
            .selectAll('.wc-chart-title')
            .style('display', 'block')
            .style('border-top', '1px solid #eee');
        this.wrap.selectAll('.wc-chart').style('padding-bottom', '2px');

        //Set y-label to measure unit.
        this.config.y.label = '';
    });
}
