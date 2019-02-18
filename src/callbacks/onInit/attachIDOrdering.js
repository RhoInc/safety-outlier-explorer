import { set } from 'd3';
export default function addIDOrdering() {
    this.IDOrder = set(this.raw_data.map(d => d[this.config.id_col]))
        .values()
        .sort()
        .map((ID, i) => {
            return {
                ID: ID,
                order: i
            };
        });
}
