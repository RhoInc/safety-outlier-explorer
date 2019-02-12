export default function attachMarks() {
    this.marks.forEach(mark => {
        mark.groups.each(group => {
            group.attributes = mark.attributes;
            if (mark.type === 'circle') group.radius = mark.radius;
        });
    });
    this.lines = this.svg.selectAll('.line');
    this.points = this.svg.selectAll('.point');
}
