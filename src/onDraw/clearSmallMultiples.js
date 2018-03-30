export default function clearSmallMultiples() {
    delete this.hovered_id;
    delete this.selected_id;
    this.wrap
        .select('.multiples')
        .select('.wc-small-multiples')
        .remove();
}
