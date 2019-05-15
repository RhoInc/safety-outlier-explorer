export default function calculateYPrecision() {
    //define the precision of the y-axis
    this.config.y.precisionFactor = Math.round(this.measure.log10range);
    this.config.y.precision = Math.pow(10, this.config.y.precisionFactor);
    this.config.y.format =
        this.config.y.precisionFactor > 0
            ? '.0f'
            : `.${Math.abs(this.config.y.precisionFactor) + 1}f`;

    //define the size of the y-axis limit increments
    let step =
        this.measure.range > 0
            ? Math.abs(this.measure.range / 15) // non-zero range
            : this.measure.results[0] !== 0
            ? Math.abs(this.measure.results[0] / 15) // zero range, non-zero result(s)
            : 1; // zero range, zero result(s)
    if (step < 1) {
        let x10 = 0;
        do {
            step = step * 10;
            ++x10;
        } while (step < 1);
        step = Math.round(step) / Math.pow(10, x10);
    } else step = Math.round(step);
    this.measure.step = step || 1;
}
