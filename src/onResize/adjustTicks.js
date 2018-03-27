export default function adjustTicks() {
    if (this.config.rotate_x_tick_labels)
        this.svg
            .selectAll('.' + axis + '.axis .tick text')
            .attr({
                transform: 'rotate(-45)',
                dx: -10,
                dy: 10
            })
            .style('text-anchor', 'end');
}
