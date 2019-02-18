export default function addParticipantCountContainer() {
    this.participantCount.container = this.controls.wrap
        .style('position', 'relative')
        .append('div')
        .attr('id', 'participant-count')
        .style({
            position: 'absolute',
            'font-style': 'italic',
            bottom: '-10px',
            left: 0
        });
}
