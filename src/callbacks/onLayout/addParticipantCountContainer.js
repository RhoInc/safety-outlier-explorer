export default function addParticipantCountContainer() {
    this.controls.wrap
        .append('div')
        .attr('id', 'participant-count')
        .style('font-style', 'italic');
}
