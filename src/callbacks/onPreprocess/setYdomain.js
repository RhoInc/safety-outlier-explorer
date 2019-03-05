export default function setYdomain() {
    if (this.measure.current !== this.measure.previous) this.config.y.domain = this.measure.domain;
    else if (this.config.y.domain[0] > this.config.y.domain[1])
        // reset y-domain
        this.config.y.domain.reverse(); // reverse y-domain
}
