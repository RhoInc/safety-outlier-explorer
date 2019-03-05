export default function reorderMarks() {
    //Move selected line behind all other lines.
    this.lines
        .each((d, i) => {
            if (d.key.indexOf(this.selected_id) === 0) d.order = this.IDOrder.length - 1;
            else if (d.order > this.selected_id_order) d.order = d.order - 1;
        })
        .sort((a, b) => b.order - a.order);

    //Move selected points behind all other points.
    this.points
        .each((d, i) => {
            if (d.key.indexOf(this.selected_id) === 0) d.order = this.IDOrder.length - 1;
            else if (d.order > this.selected_id_order) d.order = d.order - 1;
        })
        .sort((a, b) => b.order - a.order);
}
