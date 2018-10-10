export default function orderPoints() {
    this.marks.find(mark => mark.type === 'circle').groups.each((d, i) => {
        d.order = this.IDOrder.find(di => d.key.indexOf(di.ID) === 0).order;
    });
}
