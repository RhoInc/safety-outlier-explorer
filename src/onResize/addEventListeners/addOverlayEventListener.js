import clearHighlight from './functions/clearHighlight';

export default function addOverlayEventListener() {
    this.svg.select('.overlay').on('click', () => {
        //clear current multiples
        this.wrap
            .select('.multiples')
            .select('.wc-small-multiples')
            .remove();
        context.lines.classed('selected', false);
        context.points.classed('selected', false);
        delete this.hovered_id;
        delete this.selected_id;
        clearHighlight.call(this);
    });
}
