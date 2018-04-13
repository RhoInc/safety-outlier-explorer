import highlight from './functions/highlight';
import clearHighlight from './functions/clearHighlight';
import { select } from 'd3';
import smallMult from './functions/smallMultiples';

export default function addLineEventListeners() {
    const context = this;
    const lines = this.svg.selectAll('.line');
    const points = this.svg.selectAll('.point');

    lines
        .on('mouseover', function(d) {
            delete context.hovered_id;
            clearHighlight.call(context);
            context.hovered_id = d.values[0].values.raw[0][context.config.id_col];
            highlight.call(context);
        })
        .on('mouseout', function(d) {
            delete context.hovered_id;
            clearHighlight.call(context);
        })
        .on('click', function(d) {
            //Capture selected ID.
            const id = context.raw_data.find(
                di => di[context.config.id_col] === d.values[0].values.raw[0][context.config.id_col]
            );
            context.selected_id = id[context.config.id_col];

            //Un-select all lines and points.
            lines.classed('selected', false);
            points.classed('selected', false);
            clearHighlight.call(context);

            //Select line and all points corresponding to selected ID.
            select(this).classed('selected', true);
            points.classed(
                'selected',
                d => d.values.raw[0][context.config.id_col] === id[context.config.id_col]
            );

            //Generate small multiples and highlight marks.
            smallMult(id, context);
            highlight.call(context);
        });
}
