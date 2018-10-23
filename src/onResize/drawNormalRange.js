export default function drawNormalRange() {
    if (this.normalRange) this.normalRange.remove();

    if (this.config.normal_range_method) {
        this.normalRange = this.svg.insert('g', '.line-supergroup').classed('normal-range', true);
        this.normalRange
            .append('rect')
            .attr({
                x: 0,
                y: this.y(this.uln()),
                width: this.plot_width,
                height: this.y(this.lln()) - this.y(this.uln()),
                'clip-path': `url(#${this.id})`
            })
            .style({
                fill: 'blue',
                'fill-opacity': 0.1
            });
        this.normalRange.append('title').text(`Normal range: ${this.lln()}-${this.uln()}`);
    }
}
