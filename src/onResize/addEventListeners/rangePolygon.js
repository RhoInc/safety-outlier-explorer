import { svg } from 'd3';

export default function rangePolygon() {
    var area = svg
        .area()
        .x(function(d) {
            return (
                this.x(d['TIME']) +
                (this.config.x.type === 'ordinal' ? this.x.rangeBand() / 2 : 0)
            );
        })
        .y0(function(d) {
            var lbornlo = d['STNRLO'];
            return lbornlo !== 'NA' ? this.y(+lbornlo) : 0;
        })
        .y1(function(d) {
            var lbornrhi = d['STNRHI'];
            return lbornrhi !== 'NA' ? this.y(+lbornrhi) : 0;
        });

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
    this.svg
        .append('path')
        .datum(myRows)
        .attr('class', 'norms')
        .attr('fill', 'blue')
        .attr('fill-opacity', 0.1)
        .attr('d', area);
}
