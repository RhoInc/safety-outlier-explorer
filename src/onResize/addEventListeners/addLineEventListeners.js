import highlight from './highlight';
import clearHighlight from './clearHighlight';
import { select } from 'd3';
import smallMult from './smallMultiples';

export default function addLineEventListeners() {
    const context = this;

    this.svg
        .selectAll('.line')
        .on('mouseover', function(d) {
            const id = context.raw_data.find(
                di => di[context.config.id_col] === d.values[0].values.raw[0][context.config.id_col]
            );
            highlight.call(context, id);
        })
        .on('mouseout', () => {
            clearHighlight.call(context);
        })
        .on('click', function(d) {
            const id = context.raw_data.find(
                di => di[context.config.id_col] === d.values[0].values.raw[0][context.config.id_col]
            );

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
            highlight.call(context, id);
        });
}
