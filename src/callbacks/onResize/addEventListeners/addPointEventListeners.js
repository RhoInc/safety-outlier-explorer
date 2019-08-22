import clearHovered from './functions/clearHovered';
import highlightHovered from './functions/highlightHovered';
import clearSelected from './functions/clearSelected';
import highlightSelected from './functions/highlightSelected';
import smallMultiples from './functions/smallMultiples';
import addOverlapNote from './functions/addOverlapNote';
import addOverlapTitle from './functions/addOverlapTitle';

export default function addPointEventListeners() {
    var chart = this;
    this.points
        .on('mouseover', function(d) {
            addOverlapTitle.call(this, d, chart);
            clearHovered.call(chart);
            chart.hovered_id = d.values.raw[0][chart.config.id_col];
            if (chart.hovered_id !== chart.selected_id) highlightHovered.call(chart);
        })
        .on('mouseout', d => {
            clearHovered.call(this);
        })
        .on('click', function(d) {
            clearHovered.call(chart);
            clearSelected.call(chart);
            chart.selected_id = d.values.raw[0][chart.config.id_col];
            highlightSelected.call(chart);
            smallMultiples.call(chart);

            //Trigger participantsSelected event
            chart.participantsSelected = [chart.selected_id];
            chart.events.participantsSelected.data = chart.participantsSelected;
            chart.wrap.node().dispatchEvent(chart.events.participantsSelected);

            //check for overlapping points
            addOverlapNote.call(this, d, chart);
        });
}
