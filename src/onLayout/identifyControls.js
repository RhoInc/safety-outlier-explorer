export default function identifyControls() {
    this.controls.wrap
        .selectAll('.control-group')
        .attr('id', d => d.label.toLowerCase().replace(' ', '-'));
}
