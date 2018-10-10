export default function orderPoints() {
    this.marks
        .find(mark => mark.type === 'circle')
        .groups
        .each((d,i) => d.order = i);
}
