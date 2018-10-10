export default function participantCharacteristics() {
    const detail_table = this.multiples.wrap
        .insert('table', '.legend')
        .append('tbody')
        .classed('detail-listing', true);
    detail_table
        .append('thead')
        .selectAll('th')
        .data(['', ''])
        .enter()
        .append('th');
    detail_table.append('tbody');

    //Insert a line for each item in [ settings.detail_cols ].
    if (Array.isArray(this.config.details) && this.config.details.length) {
        const id = this.participantData[0];
        this.config.details.forEach(detail => {
            const value_col = detail.value_col ? detail.value_col : detail;
            const label = detail.label
                ? detail.label
                : detail.value_col
                    ? detail.value_col
                    : detail;

            if (id[value_col] !== undefined)
                detail_table
                    .select('tbody')
                    .append('tr')
                    .selectAll('td')
                    .data([label, id[value_col]])
                    .enter()
                    .append('td')
                    .style('text-align', (d, i) => (i === 0 ? 'right' : 'left'))
                    .text((d, i) => (i === 0 ? d + ':' : d));
        });
    }
}
