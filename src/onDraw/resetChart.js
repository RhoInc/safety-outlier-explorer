export default function resetChart() {
    delete this.hovered_id;
    delete this.selected_id;
    this.wrap
        .select('.multiples')
        .select('.wc-small-multiples')
        .remove();
}
