export default function clearSelected() {
    this.svg.selectAll('.line').classed('selected', false);
    this.svg.selectAll('.point').classed('selected', false);
}
