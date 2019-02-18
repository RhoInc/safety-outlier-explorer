export default function addSmallMultiplesContainer() {
    this.multiples = {
        container: this.wrap
            .append('div')
            .classed('multiples', true)
            .style({
                'border-top': '1px solid #ccc',
                'padding-top': '10px'
            }),
        id: null
    };
}
