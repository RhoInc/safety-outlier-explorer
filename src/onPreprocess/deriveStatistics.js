import { median, mean, deviation, quantile } from 'd3';

export default function deriveStatistics() {
    if (this.config.normal_range_method === 'LLN-ULN') {
        this.lln = d =>
            d instanceof Object
                ? +d[this.config.normal_col_low]
                : median(this.measure.data, d => +d[this.config.normal_col_low]);
        this.uln = d =>
            d instanceof Object
                ? +d[this.config.normal_col_high]
                : median(this.measure.data, d => +d[this.config.normal_col_high]);
    } else if (this.config.normal_range_method === 'Standard Deviation') {
        this.mean = mean(this.measure.results);
        this.sd = deviation(this.measure.results);
        this.lln = () => this.mean - this.config.normal_range_sd * this.sd;
        this.uln = () => this.mean + this.config.normal_range_sd * this.sd;
    } else if (this.config.normal_range_method === 'Quantiles') {
        this.lln = () => quantile(this.measure.results, this.config.normal_range_quantile_low);
        this.uln = () => quantile(this.measure.results, this.config.normal_range_quantile_high);
    } else {
        this.lln = d =>
            d instanceof Object ? d[this.config.value_col] + 1 : this.measure.results[0];
        this.uln = d =>
            d instanceof Object
                ? d[this.config.value_col] - 1
                : this.measure.results[this.measure.results.length - 1];
    }
}
