import { set } from 'd3';

export default function countParticipants() {
    this.participantCount = {
        N: set(this.raw_data.map(d => d[this.config.id_col]))
            .values()
            .filter(value => !/^\s*$/.test(value)).length,
        container: null, // set in ../onLayout/addParticipantCountContainer
        n: null, // set in ../onDraw/updateParticipantCount
        percentage: null // set in ../onDraw/updateParticipantCount
    };
}
