import clearHovered from './functions/clearHovered';
import highlightHovered from './functions/highlightHovered';
import clearSelected from './functions/clearSelected';
import highlightSelected from './functions/highlightSelected';
import smallMultiples from './functions/smallMultiples';

export default function addLineEventListeners() {
    this.lines
        .on('mouseover', d => {
            clearHovered.call(this);
            this.hovered_id = d.values[0].values.raw[0][this.config.id_col];
            if (this.hovered_id !== this.selected_id) highlightHovered.call(this);
        })
        .on('mouseout', d => {
            clearHovered.call(this);
        })
        .on('click', d => {
            clearHovered.call(this);
            clearSelected.call(this);
            this.selected_id = d.values[0].values.raw[0][this.config.id_col];
            highlightSelected.call(this);
            smallMultiples.call(this);

            //Trigger participantsSelected event
            this.participantsSelected = [this.selected_id];
            this.events.participantsSelected.data = this.participantsSelected;
            this.wrap.node().dispatchEvent(this.events.participantsSelected);
        });
}
