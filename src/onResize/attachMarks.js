export default function attachMarks() {
    this.marks.forEach(mark => {
        const type = mark.type === 'circle'
            ? 'point'
            : mark.type;
        this[`${type}s`] = mark.groups;
    });
}
