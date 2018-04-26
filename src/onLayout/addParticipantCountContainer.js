export default function addParticipantCountContainer() {
    this.populationAnnotation = this.controls.wrap
        .append('div')
        .attr('id', 'population-count')
        .style('font-style', 'italic');
}
