import { set, format, select } from 'd3';

export default function updateParticipantCount() {
    //count the number of unique ids in the current chart and calculate the percentage
    this.participantCount.n = set(
        this.filtered_data.map(d => d[this.config.id_col])
    ).values().length;
    this.participantCount.percentage = format('0.1%')(
        this.participantCount.n / this.participantCount.N
    );

    //clear the annotation
    this.participantCount.container.selectAll('*').remove();

    //update the annotation
    this.participantCount.container.text(
        `\n${this.participantCount.n} of ${this.participantCount.N} participant(s) shown (${
            this.participantCount.percentage
        })`
    );
}
