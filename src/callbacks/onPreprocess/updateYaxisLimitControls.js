export default function updateYaxisLimitControls() {
    this.controls.wrap
        .selectAll('.control-group')
        .filter(f => f.option === 'y.domain[0]')
        .select('input')
        .attr('step', this.measure.step) // set in ./calculateYPrecision
        .style('box-shadow', 'none')
        .property('value', this.config.y.domain[0]);

    this.controls.wrap
        .selectAll('.control-group')
        .filter(f => f.option === 'y.domain[1]')
        .select('input')
        .attr('step', this.measure.step) // set in ./calculateYPrecision
        .style('box-shadow', 'none')
        .property('value', this.config.y.domain[1]);
}
