export default function onLayout() {
    const chart = this,
        config = chart.config;

    //Define x-axis column control behavior.
    let xColSelect = this.controls.wrap
        .selectAll('.control-group')
        .filter(f => f.option === 'x.column')
        .select('select');

    //Map column names to column labels.
    xColSelect
        .selectAll('option')
        .text(
            d => this.config.time_cols[this.config.time_cols.map(d => d.value_col).indexOf(d)].label
        );

    //Define event listener.
    xColSelect.on('change', d => {
        const time_col = this.config.time_cols[
            this.config.time_cols.map(di => di.label).indexOf(xColSelect.property('value'))
        ];

        //Redefine settings properties based on x-axis column selection.
        this.config.x.column = time_col.value_col;
        this.config.x.type = time_col.type;
        this.config.x.label = time_col.label;
        this.config.x.order = time_col.order;
        this.config.marks[1].per[2] = time_col.value_col;
        this.config.rotate_x_tick_labels = time_col.rotate_tick_labels;
        this.config.margin.bottom = time_col.vertical_space;

        this.draw();
    });
    //Add a button to reset the y-domain
    var resetDiv = this.controls.wrap
        .append('div')
        .attr('class', 'control-group')
        .datum({ label: 'reset_y', value_col: null, option: null });
    resetDiv
        .append('span')
        .attr('class', 'control-label')
        .html("Reset to [<span class='min'></span> - <span class='max'></span>]");
    resetDiv
        .append('button')
        .text('Reset Y-axis')
        .on('click', function() {
            const measure_data = chart.raw_data.filter(
                d => d[config.measure_col] === chart.currentMeasure
            );
            chart.config.y.domain = d3.extent(measure_data, d => +d[config.value_col]); //reset axis to full range

            chart.controls.wrap
                .selectAll('.control-group')
                .filter(f => f.option === 'y.domain[0]')
                .select('input')
                .property('value', chart.config.y.domain[0]);

            chart.controls.wrap
                .selectAll('.control-group')
                .filter(f => f.option === 'y.domain[1]')
                .select('input')
                .property('value', chart.config.y.domain[1]);

            chart.draw();
        });

    //Add div for participant counts.
    this.controls.wrap.append('p').classed('annote', true);

    //Add wrapper for small multiples.
    this.wrap.append('div').attr('class', 'multiples');
}
