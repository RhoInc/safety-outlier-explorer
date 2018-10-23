export default function addIDOrdering() {
    this.IDOrder = d3
        .set(this.raw_data.map(d => d[this.config.id_col]))
        .values()
        .sort()
        .map((ID, i) => {
            return {
                ID: ID,
                order: i
            };
        });
}
