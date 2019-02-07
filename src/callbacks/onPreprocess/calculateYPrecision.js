export default function calculateYPrecision() {
    //define the precision of the y-axis
    const log10range = Math.log10(this.measure.range);
    this.config.y.precision = Math.floor(log10range) + 1;
    console.log(log10range);
    console.log(this.config.y.precision);
    this.config.y.format = `${this.config.y.precision}f`

    //define the size of the y-axis limit increments
    let step = this.measure.range/15;
    if (step < 1) {
        let x10 = 0;
        do {
            step = step*10;
            ++x10;
        }
        while (step < 1);
        step = Math.round(step)/Math.pow(10,x10);
    } else
        step = Math.round(step);
    this.measure.step = step;
}
