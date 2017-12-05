import { set, extent } from 'd3';

export default function onPreprocess() {
    const context = this,
        config = this.config;

    //Check if the selected measure has changed.
    const prevMeasure = this.currentMeasure;
    this.currentMeasure = this.controls.wrap
        .selectAll('.control-group')
        .filter(d => d.value_col && d.value_col === config.measure_col)
        .select('option:checked')
        .text();
    const changedMeasureFlag = this.currentMeasure !== prevMeasure;

    //Define x-axis domain.
    const measure_data = this.raw_data.filter(d => d[config.measure_col] === this.currentMeasure);
    this.config.x.domain =
        config.x.type === 'ordinal'
            ? set(measure_data.map(d => d[config.x.column])).values()
            : extent(measure_data, d => +d[config.x.column]);
    if (this.config.x.order) {
        this.config.x.domain.sort(function(a, b) {
            var aindex = config.x.order.indexOf(a);
            var bindex = config.x.order.indexOf(b);
            return aindex - bindex;
        });
    }

    //Set y-axis domain.
    if (changedMeasureFlag) {
        //reset axis to full range when measure changes
        this.config.y.domain = extent(measure_data, d => +d[config.value_col]);
        this.controls.wrap
            .selectAll('.y-axis')
            .property(
                'title',
                `Initial Limits: [${this.config.y.domain[0]} - ${this.config.y.domain[1]}]`
            );

        //Set y-axis domain controls.
        this.controls.wrap
            .selectAll('.control-group')
            .filter(f => f.option === 'y.domain[0]')
            .select('input')
            .property('value', this.config.y.domain[0]);
        this.controls.wrap
            .selectAll('.control-group')
            .filter(f => f.option === 'y.domain[1]')
            .select('input')
            .property('value', this.config.y.domain[1]);
    }
}
