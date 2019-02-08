import { set } from 'd3';

export default function countParticipants() {
    this.participantCount = {
        N: set(this.raw_data.map(d => d[this.config.id_col])).values().length
    };
}
