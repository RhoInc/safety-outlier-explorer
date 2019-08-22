export default function addSmallMultiplesContainer() {
    this.multiples = {
        container: this.wrap
            .append('div')
            .classed('multiples', true)
            .style({
                'padding-top': '10px'
            }),
        id: null
    };
}
