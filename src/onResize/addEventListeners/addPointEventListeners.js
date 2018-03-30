import highlight from './functions/highlight';
import clearHighlight from './functions/clearHighlight';
import clearSelected from './functions/clearSelected';
import applySelected from './functions/applySelected';
import smallMultiples from './functions/smallMultiples';

export default function addPointEventListeners() {
    this.svg
        .selectAll('.point')
        .on('mouseover', d => {
            this.hovered_id = d.values.raw[0][this.config.id_col];
            highlight.call(this);
        })
        .on('mouseout', d => {
            delete this.hovered_id;
            clearHighlight.call(this);
        })
        .on('click', d => {
            this.selected_id = d.values.raw[0][this.config.id_col];
            clearSelected.call(this);
            applySelected.call(this);
            highlight.call(this);
            smallMultiples.call(this);
        });
}
