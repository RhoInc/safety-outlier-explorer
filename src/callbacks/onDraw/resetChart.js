export default function resetChart() {
    this.svg.selectAll('.line,.point').remove();
    this.wrap.select('div.overlapNote').remove();
    //delete this.hovered_id;
    //delete this.selected_id;
    //if (this.multiples.chart)
    //    this.multiples.chart.destroy();
}
