export default function setYdomain() {
    if (this.measure.current !== this.measure.previous) this.config.y.domain = this.measure.domain; // reset y-domain
    else if (this.config.y.domain[0] > this.config.y.domain[1]) this.config.y.domain.reverse(); // reverse y-domain
}
