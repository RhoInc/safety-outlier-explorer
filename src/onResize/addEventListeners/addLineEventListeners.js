import '../../util/d3-selection-delegate';
import highlight from './functions/highlight';
import clearHighlight from './functions/clearHighlight';
import { select } from 'd3';
import smallMult from './functions/smallMultiples';

export default function addLineEventListeners() {
    const context = this;

    this.lineSuperGroup
        .delegate('mouseover', 'g', d => {
            this.hovered_id = d.values[0].values.raw[0][context.config.id_col];
            highlight.call(this);
        })
        .delegate('mouseout', 'g', d => {
            delete this.hovered_id;
            clearHighlight.call(this);
        })
        .delegate('click', 'g', function(d) {
            const id = context.raw_data.find(
                di => di[context.config.id_col] === d.values[0].values.raw[0][context.config.id_col]
            );
            context.selected_id = id[context.config.id_col];

            //Un-select all lines and points.
            context.lines.classed('selected', false);
            context.points.classed('selected', false);

            //Select line and all points corresponding to selected ID.
            select(this).classed('selected', true);
            context.points
                .classed('selected', d => d.values.raw[0][context.config.id_col] === id[context.config.id_col]);

            //Generate small multiples and highlight marks.
            smallMult(id, context);
            highlight.call(context);
        });
}
