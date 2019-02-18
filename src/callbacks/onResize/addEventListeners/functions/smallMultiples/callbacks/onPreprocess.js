import { min, max } from 'd3';

export default function onPreprocess() {
    this.multiples.chart.on('preprocess', function() {
        //Define y-domain as minimum of lower limit of normal and minimum result and maximum of
        //upper limit of normal and maximum result.
        const filtered_data = this.raw_data.filter(
            f => f[this.filters[0].col] === this.filters[0].val
        );

        //Calculate range of normal range.
        const normlo = Math.min.apply(
            null,
            filtered_data.map(m => +m[this.config.normal_col_low]).filter(f => +f || +f === 0)
        );
        const normhi = Math.max.apply(
            null,
            filtered_data.map(m => +m[this.config.normal_col_high]).filter(f => +f || +f === 0)
        );

        //Calculate range of data.
        const ylo = min(
            filtered_data.map(m => +m[this.config.y.column]).filter(f => +f || +f === 0)
        );
        const yhi = max(
            filtered_data.map(m => +m[this.config.y.column]).filter(f => +f || +f === 0)
        );

        //Set y-domain.
        this.config.y_dom = [Math.min(normlo, ylo), Math.max(normhi, yhi)];
    });
}
