export default function insertGrouping(selector, label) {
    const grouping = this.controls.wrap
        .insert('div', selector)
        .style({
            display: 'inline-block',
            'margin-right': '5px'
        })
        .append('fieldset')
        .style('padding', '0px 2px');
    grouping.append('legend').text(label);
    this.controls.wrap.selectAll(selector).each(function(d) {
        this.style.marginTop = '0px';
        this.style.marginRight = '2px';
        this.style.marginBottom = '2px';
        this.style.marginLeft = '2px';
        grouping.node().appendChild(this);
    });
}
