export default function clearHighlight() {
    this.svg
        .selectAll('.line:not(.selected)')
        .select('path')
        .attr('stroke-width', 0.5);
    this.svg
        .selectAll('.point:not(.selected)')
        .select('circle')
        .attr('r', 2);
}
