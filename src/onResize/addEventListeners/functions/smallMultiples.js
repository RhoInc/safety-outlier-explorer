import defineSmallMultiples from './smallMultiples/defineSmallMultiples';
import insertHeader from './smallMultiples/insertHeader';
import participantCharacteristics from './smallMultiples/participantCharacteristics';
import onLayout from './smallMultiples/callbacks/onLayout';
import onPreprocess from './smallMultiples/callbacks/onPreprocess';
import onResize from './smallMultiples/callbacks/onResize';
import { multiply } from 'webcharts';

export default function smallMultiples() {
    //Clear current multiples.
    this.wrap
        .select('.multiples')
        .select('.wc-small-multiples')
        .remove();

    //Define participant data.
    this.participantData = this.initial_data.filter(
        d => d[this.config.id_col] === this.selected_id
    );

    //Define small multiples.
    defineSmallMultiples.call(this);

    //Insert header.
    insertHeader.call(this);

    //Insert participant characteristics table.
    participantCharacteristics.call(this);

    //Add callbacks to small multiples.
    onLayout.call(this);
    onPreprocess.call(this);
    onResize.call(this);

    //Initialize small multiples.
    multiply(this.multiples, this.participantData, 'measure_unit', this.measures);
}
