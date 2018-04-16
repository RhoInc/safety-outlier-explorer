import clone from '../../../util/clone';
import { min, max, set } from 'd3';
import { createChart, multiply } from 'webcharts';
import rangePolygon from './smallMultiples/rangePolygon';
import adjustTicks from '../../adjustTicks';

export default function smallMultiples(id, chart) {
    //Clear current multiples.
    chart.wrap
        .select('.multiples')
        .select('.wc-small-multiples')
        .remove();

    //Define small multiples settings.
    const multiples_settings = Object.assign(
        {},
        clone(chart.config),
        clone(Object.getPrototypeOf(chart.config))
    );
    multiples_settings.x.domain = null;
    multiples_settings.y.domain = null;
    multiples_settings.resizable = false;
    multiples_settings.scale_text = false;

    if (multiples_settings.multiples_sizing.width)
        multiples_settings.width = multiples_settings.multiples_sizing.width;
    if (multiples_settings.multiples_sizing.height)
        multiples_settings.height =
            multiples_settings.multiples_sizing.height +
            (multiples_settings.margin.bottom ? multiples_settings.margin.bottom : 0);

    multiples_settings.margin = { bottom: multiples_settings.margin.bottom || 20 };

    let multiples = createChart(chart.wrap.select('.multiples').node(), multiples_settings, null);

    //Insert header.
    multiples.wrap.insert('strong', '.legend').text(`All Measures for ${id[chart.config.id_col]}`);
    let detail_table = multiples.wrap
        .insert('table', '.legend')
        .append('tbody')
        .classed('detail-listing', true);
    detail_table
        .append('thead')
        .selectAll('th')
        .data(['', ''])
        .enter()
        .append('th');
    detail_table.append('tbody');

    //Insert a line for each item in [ settings.detail_cols ].
    if (chart.config.details && chart.config.details.length) {
        chart.config.details.forEach(detail => {
            const value_col = detail.value_col ? detail.value_col : detail;

            const label = detail.label
                ? detail.label
                : detail.value_col ? detail.value_col : detail;

            if (id[value_col] !== undefined)
                detail_table
                    .select('tbody')
                    .append('tr')
                    .selectAll('td')
                    .data([label, id[value_col]])
                    .enter()
                    .append('td')
                    .style('text-align', (d, i) => (i === 0 ? 'right' : 'left'))
                    .text((d, i) => (i === 0 ? d + ':' : d));
        });
    }

    //Add styling to small multiples.
    multiples.on('layout', function() {
        //Define multiple styling.
        this.wrap.style('display', 'block');
        this.wrap
            .selectAll('.wc-chart-title')
            .style('display', 'block')
            .style('border-top', '1px solid #eee');
        this.wrap.selectAll('.wc-chart').style('padding-bottom', '2px');

        //Set y-label to measure unit.
        this.config.y.label =
            this.raw_data.find(
                d => d[this.config.measure_col] === this.wrap.select('.wc-chart-title').text()
            )[this.config.unit_col] || '';
    });

    multiples.on('preprocess', function() {
        //Define y-domain as minimum of lower limit of normal and minimum result and maximum of
        //upper limit of normal and maximum result.
        const filtered_data = this.raw_data.filter(
            f => f[this.filters[0].col] === this.filters[0].val
        );

        //Calculate range of normal range.
        const normlo = Math.min.apply(
            null,
            filtered_data.map(m => +m[chart.config.normal_col_low]).filter(f => +f || +f === 0)
        );
        const normhi = Math.max.apply(
            null,
            filtered_data.map(m => +m[chart.config.normal_col_high]).filter(f => +f || +f === 0)
        );

        //Calculate range of data.
        const ylo = min(
            filtered_data.map(m => +m[chart.config.y.column]).filter(f => +f || +f === 0)
        );
        const yhi = max(
            filtered_data.map(m => +m[chart.config.y.column]).filter(f => +f || +f === 0)
        );

        //Set y-domain.
        this.config.y_dom = [Math.min(normlo, ylo), Math.max(normhi, yhi)];
    });

    multiples.on('resize', function() {
        //Resize text manually.
        this.wrap.select('.wc-chart-title').style('font-size', '12px');
        this.svg.selectAll('.axis .tick text').style('font-size', '10px');

        //Draw normal range.
        if (this.filtered_data.length) rangePolygon.call(this);

        //Axis tweaks
        //this.svg.select('.y.axis').select('.axis-title').text(this.filtered_data[0][chart.config.unit_col]);
        this.svg
            .select('.x.axis')
            .select('.axis-title')
            .remove();

        //Delete legend.
        this.legend.remove();

        //Rotate ticks.
        adjustTicks.call(this);
    });

    const ptData = chart.initial_data.filter(
        f => f[chart.config.id_col] === id[chart.config.id_col]
    );

    multiply(
        multiples,
        ptData,
        chart.config.measure_col,
        set(ptData.map(d => d[chart.config.measure_col]))
            .values()
            .sort()
    );
}
