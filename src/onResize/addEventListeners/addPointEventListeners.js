import clearHovered from './functions/clearHovered';
import highlightHovered from './functions/highlightHovered';
import clearSelected from './functions/clearSelected';
import highlightSelected from './functions/highlightHovered';
import reorderMarks from './functions/reorderMarks';
import smallMultiples from './functions/smallMultiples';

export default function addPointEventListeners() {
    this.points
        .on('mouseover', d => {
            clearHovered.call(this);
            this.hovered_id = d.values.raw[0][this.config.id_col];
            if (this.hovered_id !== this.selected_id)
                highlightHovered.call(this);
        })
        .on('mouseout', d => {
            clearHovered.call(this);
        })
        .on('click', d => {
            clearHovered.call(this);
            clearSelected.call(this);
            this.selected_id = d.values.raw[0][this.config.id_col];
            this.selected_id_order = this.IDOrder.find(di => di.ID === this.selected_id).order;
            highlightSelected.call(this);
            reorderMarks.call(this);
            smallMultiples.call(this);
        });
}
