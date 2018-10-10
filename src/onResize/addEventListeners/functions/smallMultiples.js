import defineSmallMultiples from './smallMultiples/defineSmallMultiples';
import insertHeader from './smallMultiples/insertHeader';
import participantCharacteristics from './smallMultiples/participantCharacteristics';
import onLayout from './smallMultiples/callbacks/onLayout';
import onPreprocess from './smallMultiples/callbacks/onPreprocess';
import onResize from './smallMultiples/callbacks/onResize';
import { multiply } from 'webcharts';
import clearHighlight from './clearHighlight';
import clearSelected from './clearSelected';
import applySelected from './applySelected';
import highlight from './highlight';

export default function smallMultiples() {
    const context = this; // chart

    //Clear current multiples.
    this.wrap
        .select('.multiples')
        .select('.wc-controls')
        .remove();
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
    //insertHeader.call(this);

    //Insert participant characteristics table.
    participantCharacteristics.call(this);

    //Add callbacks to small multiples.
    onLayout.call(this);
    onPreprocess.call(this);
    onResize.call(this);

    //Initialize small multiples.
    multiply(this.multiples, this.participantData, 'measure_unit', this.measures);
    const participantDropdown = this.multiples.controls.wrap
        .style('margin', 0)
        .selectAll('.control-group')
        .style('margin', 0);
    participantDropdown.selectAll('*').style('display', 'inline-block');
    participantDropdown.selectAll('.wc-control-label').style('font-weight', 'bold');
    participantDropdown
        .selectAll('select')
        .style('margin-left', '3px')
        .on('change', function(d) {
            context.wrap
                .select('.multiples')
                .selectAll('.wc-controls')
                .remove();
            context.wrap
                .select('.multiples')
                .selectAll('.wc-small-multiples')
                .remove();
            delete context.hovered_id;
            context.selected_id = d3
                .select(this)
                .selectAll('option:checked')
                .text();
            clearSelected.call(context);
            applySelected.call(context);
            clearHighlight.call(context);
            applySelected.call(context);
            highlight.call(context);
            smallMultiples.call(context);
        });
}
