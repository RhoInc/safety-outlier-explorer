import { extent } from 'd3';

export default function addResetButton() {
    const context = this,
        resetContainer = this.controls.wrap
            .insert('div', '#lower-limit')
            .classed('control-group y-axis', true)
            .datum({
                type: 'button',
                option: 'y.domain',
                label: 'Y-axis:'
            }),
        resetLabel = resetContainer
            .append('span')
            .attr('class', 'control-label')
            .style('text-align', 'right')
            .text('Y-axis:'),
        resetButton = resetContainer
            .append('button')
            .text('Reset Limits')
            .on('click', function() {
                const measure_data = context.raw_data.filter(
                    d => d[context.config.measure_col] === context.currentMeasure
                );
                context.config.y.domain = extent(measure_data, d => +d[context.config.value_col]); //reset axis to full range

                context.controls.wrap
                    .selectAll('.control-group')
                    .filter(f => f.option === 'y.domain[0]')
                    .select('input')
                    .property('value', context.config.y.domain[0]);

                context.controls.wrap
                    .selectAll('.control-group')
                    .filter(f => f.option === 'y.domain[1]')
                    .select('input')
                    .property('value', context.config.y.domain[1]);

                context.draw();
            });
}
