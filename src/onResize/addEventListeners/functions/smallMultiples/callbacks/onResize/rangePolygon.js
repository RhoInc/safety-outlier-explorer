import { svg } from 'd3';

export default function rangePolygon() {
    var area = svg
        .area()
        .x(d => this.x(d['TIME']) + (this.config.x.type === 'ordinal' ? this.x.rangeBand() / 2 : 0))
        .y0(
            d =>
                /^-?[0-9.]+$/.test(d[this.config.normal_col_low])
                    ? this.y(d[this.config.normal_col_low])
                    : 0
        )
        .y1(
            d =>
                /^-?[0-9.]+$/.test(d[this.config.normal_col_high])
                    ? this.y(d[this.config.normal_col_high])
                    : 0
        );

    var dRow = this.filtered_data[0];

    var myRows = this.x_dom.slice().map(m => {
        return {
            STNRLO: dRow[this.config.normal_col_low],
            STNRHI: dRow[this.config.normal_col_high],
            TIME: m
        };
    });

    //remove what is there now
    this.svg.select('.norms').remove();

    //add new
    const normalRange = this.svg
        .append('g')
        .datum(myRows)
        .attr('class', 'norms');
    normalRange
        .append('path')
        .attr('fill', 'blue')
        .attr('fill-opacity', 0.1)
        .attr('d', area);
    normalRange.append('title').text(d => `Normal range: ${d[0].STNRLO}-${d[0].STNRHI}`);
}
