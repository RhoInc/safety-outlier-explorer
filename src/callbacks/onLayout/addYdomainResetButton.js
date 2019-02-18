import { extent } from 'd3';

export default function addYdomainResetButton() {
    const resetContainer = this.controls.wrap
        .insert('div', '#lower')
        .classed('control-group y-axis', true)
        .datum({
            type: 'button',
            option: 'y.domain',
            label: ''
        })
        .style('vertical-align', 'bottom');
    const resetLabel = resetContainer
        .append('span')
        .attr('class', 'wc-control-label')
        .text('Limits');
    const resetButton = resetContainer
        .append('button')
        .text(' Reset ')
        .style('padding', '0px 5px')
        .on('click', () => {
            this.config.y.domain = this.measure.domain; //reset axis to full range
            this.draw();
        });
}
