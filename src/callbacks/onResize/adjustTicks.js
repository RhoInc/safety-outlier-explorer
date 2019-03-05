export default function adjustTicks() {
    if (this.config.x.rotate_tick_labels)
        this.svg
            .selectAll('.x.axis .tick text')
            .attr({
                transform: 'rotate(-45)',
                dx: -10,
                dy: 10
            })
            .style('text-anchor', 'end');
}
