export default function addRemovedRecordsNote() {
    if (this.nNonNumeric > 0) {
        const removedRecords = this.controls.wrap
            .append('div')
            .style({
                'position': 'absolute',
                'font-style': 'italic',
                'bottom': '-10px',
                'right': 0,
            })
            .text(`${this.nNonNumeric} non-numeric records were removed.`);
        removedRecords
            .append('span')
            .style({
                'color': 'blue',
                'text-decoration': 'underline',
                'font-style': 'normal',
                'font-weight': 'bold',
                'cursor': 'pointer',
                'font-size': '16px',
                'margin-left': '5px',
            })
            .html('<sup>x</sup>')
            .on('click', () => removedRecords.remove());
    }
}
