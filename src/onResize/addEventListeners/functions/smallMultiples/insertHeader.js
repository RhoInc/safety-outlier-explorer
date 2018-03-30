export default function insertHeader() {
    this.multiples.wrap.insert('strong', '.legend').text(`All Measures for ${this.selected_id}`);
}
