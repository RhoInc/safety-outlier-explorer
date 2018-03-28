export default function highlight(id) {
    const myLine = this.svg
        .selectAll('.line')
        .filter(d => d.values[0].values.raw[0][this.config.id_col] === id[this.config.id_col]);
    myLine.select('path').attr('stroke-width', 4);

    const myPoints = this.svg
        .selectAll('.point')
        .filter(d => d.values.raw[0][this.config.id_col] === id[this.config.id_col]);
    myPoints
        .select('circle')
        .attr('r', this.config.marks.find(mark => mark.type === 'circle').radius * 1.5);
}
