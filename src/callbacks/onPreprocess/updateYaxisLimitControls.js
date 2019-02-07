export default function updateYaxisLimitControls() {
    //Update y-axis limit controls.
    this.controls.wrap
        .selectAll('.control-group')
        .filter(f => f.option === 'y.domain[0]')
        .select('input')
        .property('value', this.config.y.domain[0])
        .style('box-shadow', 'none');

    this.controls.wrap
        .selectAll('.control-group')
        .filter(f => f.option === 'y.domain[1]')
        .select('input')
        .property('value', this.config.y.domain[1])
        .style('box-shadow', 'none');
}
