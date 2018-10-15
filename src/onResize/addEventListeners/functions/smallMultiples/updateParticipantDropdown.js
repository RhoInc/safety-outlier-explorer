import clearSelected from '../clearSelected';
import highlightSelected from '../highlightSelected';
import smallMultiples from '../smallMultiples';

export default function updateParticipantDropdown() {
    const context = this; // chart

    const participantDropdown = this.multiples.controls.wrap
        .style('margin', 0)
        .selectAll('.control-group')
        .style('margin', 0);
    participantDropdown
        .selectAll('*')
        .style('display', 'inline-block');
    participantDropdown
        .selectAll('.wc-control-label')
        .style('font-weight', 'bold');
    participantDropdown
        .selectAll('select')
        .style('margin-left', '3px')
        .on('change', function(d) {
            context.multiples.id = d3
                .select(this)
                .selectAll('option:checked')
                .text();
            clearSelected.call(context);
            context.selected_id = context.multiples.id;
            highlightSelected.call(context);
            smallMultiples.call(context);
        });
}
