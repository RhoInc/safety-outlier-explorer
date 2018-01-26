export default function labelXaxisOptions() {
    this.controls.wrap
        .selectAll('.control-group')
        .filter(d => d.option === 'x.column')
        .selectAll('option')
        .property(
            'label',
            d => this.config.time_cols.filter(time_col => time_col.value_col === d)[0].label
        );
}
