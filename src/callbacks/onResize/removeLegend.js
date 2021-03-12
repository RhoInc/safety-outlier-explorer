export default function removeLegend() {
    if (this.config.color_by === 'soe_none') this.wrap.select('.legend').remove();
}
