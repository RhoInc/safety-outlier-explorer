export default function participantCharacteristics() {
    this.multiples.detail_table = this.multiples.chart.wrap
        .insert('table', '.legend')
        .append('tbody')
        .classed('detail-listing', true);
    this.multiples.detail_table
        .append('thead')
        .selectAll('th')
        .data(['', ''])
        .enter()
        .append('th');
    this.multiples.detail_table.append('tbody');

    //Insert a line for each item in [ settings.detail_cols ].
    if (Array.isArray(this.config.details) && this.config.details.length) {
        const participantDatum = this.multiples.data[0];
        this.config.details.forEach(detail => {
            const value_col = detail.value_col ? detail.value_col : detail;
            const label = detail.label
                ? detail.label
                : detail.value_col ? detail.value_col : detail;
            const tuple = [label, participantDatum[value_col]];

            if (tuple[1] !== undefined)
                this.multiples.detail_table
                    .select('tbody')
                    .append('tr')
                    .selectAll('td')
                    .data(tuple)
                    .enter()
                    .append('td')
                    .style('text-align', (d, i) => (i === 0 ? 'right' : 'left'))
                    .text((d, i) => (i === 0 ? d + ':' : d));
        });
    }
}
