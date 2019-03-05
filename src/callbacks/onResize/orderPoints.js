export default function orderPoints() {
    this.marks.filter(mark => mark.type === 'circle').forEach(mark => {
        mark.groups.each((d, i) => {
            d.order = this.IDOrder.find(di => d.key.indexOf(di.ID) === 0).order;
        });
    });
}
