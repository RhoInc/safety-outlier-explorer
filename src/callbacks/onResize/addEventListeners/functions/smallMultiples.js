import defineSmallMultiples from './smallMultiples/defineSmallMultiples';
import participantCharacteristics from './smallMultiples/participantCharacteristics';
import onLayout from './smallMultiples/callbacks/onLayout';
import onPreprocess from './smallMultiples/callbacks/onPreprocess';
import onResize from './smallMultiples/callbacks/onResize';
import { multiply } from 'webcharts';
import updateParticipantDropdown from './smallMultiples/updateParticipantDropdown';

export default function smallMultiples() {
    //Define participant data.
    this.multiples.data = this.initial_data.filter(d => d[this.config.id_col] === this.selected_id);

    //Define small multiples.
    defineSmallMultiples.call(this);

    //Insert participant characteristics table.
    participantCharacteristics.call(this);

    //Add callbacks to small multiples.
    onLayout.call(this);
    onPreprocess.call(this);
    onResize.call(this);

    //Initialize small multiples.
    multiply(this.multiples.chart, this.multiples.data, 'soe_measure', this.measures);

    //Update participant dropdown.
    updateParticipantDropdown.call(this);
}
