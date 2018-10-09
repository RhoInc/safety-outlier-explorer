import highlight from './functions/highlight';
import clearHighlight from './functions/clearHighlight';
import clearSelected from './functions/clearSelected';
import applySelected from './functions/applySelected';
import smallMultiples from './functions/smallMultiples';

export default function addPointEventListeners() {
    const context = this;
    const lines = this.svg.selectAll('.line');
    const points = this.svg.selectAll('.point');

    points
        .on('mouseover', function(d) {
            delete context.hovered_id;
            clearHighlight.call(context);
            context.hovered_id = d.values.raw[0][context.config.id_col];
            highlight.call(context);
        })
        .on('mouseout', function(d) {
            delete context.hovered_id;
            clearHighlight.call(context);
        })
        .on('click', d => {
            delete context.hovered_id;
            this.selected_id = d.values.raw[0][this.config.id_col];
            clearSelected.call(this);
            applySelected.call(this);
            highlight.call(this);
            smallMultiples.call(this);
        });
}
