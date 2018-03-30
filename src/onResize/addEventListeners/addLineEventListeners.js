import highlight from './functions/highlight';
import clearHighlight from './functions/clearHighlight';
import { select } from 'd3';
import smallMult from './functions/smallMultiples';

export default function addLineEventListeners() {
    const context = this;

    this.svg
        .selectAll('.line')
        .on('mouseover', d => {
            this.hovered_id = d.values[0].values.raw[0][context.config.id_col];
            highlight.call(this);
        })
        .on('mouseout', d => {
            delete this.hovered_id;
            clearHighlight.call(this);
        })
        .on('click', function(d) {
            const id = context.raw_data.find(
                di => di[context.config.id_col] === d.values[0].values.raw[0][context.config.id_col]
            );
            context.selected_id = id[context.config.id_col];

            //Un-select all lines and points.
            context.svg.selectAll('.line').classed('selected', false);
            context.svg.selectAll('.point').classed('selected', false);

            //Select line and all points corresponding to selected ID.
            select(this).classed('selected', true);
            context.svg
                .selectAll('.point')
                .filter(d => d.values.raw[0][context.config.id_col] === id[context.config.id_col])
                .classed('selected', true);

            //Generate small multiples and highlight marks.
            smallMult(id, context);
            highlight.call(context);
        });
}
