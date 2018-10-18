export default function addSmallMultiplesContainer() {
    this.multiples = {
        container: this.wrap.append('div').classed('multiples', true),
        id: null
    };
}
