export default function clearSelected() {
    const context = this;

    this.marks.forEach(mark => {
        const element = mark.type === 'line' ? 'path' : mark.type;
        mark.groups
            .classed('selected', false)
            .select(element)
            .attr(mark.attributes);
    });

    // Reset color of selected point to original color if group by active
    if (this.config.color_by != 'soe_none') {
        this.points
            .filter(d => d.values.raw[0][this.config.id_col] === this.selected_id)
            .select('circle')
            .attr('stroke', d => context.colorScale(d.values.raw[0][context.config.color_by]));
    }
    if (this.multiples.chart) this.multiples.chart.destroy();
    delete this.selected_id;

    //Trigger participantsSelected event
    this.participantsSelected = [];
    this.events.participantsSelected.data = this.participantsSelected;
    this.wrap.node().dispatchEvent(this.events.participantsSelected);
}
