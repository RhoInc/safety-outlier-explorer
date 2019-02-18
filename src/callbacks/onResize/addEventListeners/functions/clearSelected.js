export default function clearSelected() {
    this.marks.forEach(mark => {
        const type = mark.type === 'circle' ? 'point' : mark.type;
        const element = mark.type === 'line' ? 'path' : mark.type;
        mark.groups
            .classed('selected', false)
            .select(element)
            .attr(this.config[`${type}_attributes`]);
    });
    if (this.multiples.chart) this.multiples.chart.destroy();
    delete this.selected_id;
}
