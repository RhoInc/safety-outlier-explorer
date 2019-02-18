export default function extendYDomain() {
    if (
        this.config.y.domain[0] === this.measure.domain[0] &&
        this.config.y.domain[1] === this.measure.domain[1] &&
        this.config.y.domain[0] < this.measure.domain[1]
    )
        this.y_dom = [
            this.config.y.domain[0] - this.measure.range * 0.01,
            this.config.y.domain[1] + this.measure.range * 0.01
        ];
}
