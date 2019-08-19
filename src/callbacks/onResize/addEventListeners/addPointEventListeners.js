import clearHovered from './functions/clearHovered';
import highlightHovered from './functions/highlightHovered';
import clearSelected from './functions/clearSelected';
import highlightSelected from './functions/highlightSelected';
import smallMultiples from './functions/smallMultiples';
import checkOverlap from './functions/checkOverlap';
export default function addPointEventListeners() {
    var chart = this;
    this.points
        .on('mouseover', d => {
            clearHovered.call(this);
            this.hovered_id = d.values.raw[0][this.config.id_col];
            if (this.hovered_id !== this.selected_id) highlightHovered.call(this);
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
            checkOverlap.call(this, d, chart);
        });
}
