import { select, min, max } from 'd3';
import { createChart, multiply } from 'webcharts';
import rangePolygon from './util/rangePolygon';

export default function(id, chart) {
    //clear current multiples
	chart.wrap.select('.multiples').select('.wc-small-multiples').remove();
    //Establish settings for small multiples based off of the main chart
    //NOTE: will likely need polyfill for Object.assign
    var mult_settings = Object.assign({}, chart.config, Object.getPrototypeOf(chart.config));
    mult_settings.aspect = 5.4;
    mult_settings.margin = {bottom:20};
    var multiples = createChart(chart.wrap.select('.multiples').node(), mult_settings, null);

  //Insert header.
    let text = 'All Measures for '
        + id[chart.config.id_col];
    multiples.wrap
        .insert('strong', '.legend')
        .text(text);
    let detail_table = multiples.wrap
        .insert('table', '.legend')
        .append('tbody')
        .classed('detail-listing', true);
    detail_table
        .append('thead')
        .selectAll('th')
            .data(['',''])
            .enter()
            .append('th');
    detail_table
        .append('tbody');
  //Insert a line for each item in [ settings.detail_cols ].
    if (chart.config.details && chart.config.details.length) {
        chart.config.details
            .forEach(detail => {
                const value_col = detail.value_col
                    ? detail.value_col
                    : detail;
                const label = detail.label
                    ? detail.label
                    : detail.value_col
                        ? detail.value_col
                        : detail;
                if (id[value_col] !== undefined) {
                    let detail_row = detail_table.select('tbody')
                        .append('tr')
                        .selectAll('td')
                            .data([label, id[value_col]])
                            .enter()
                            .append('td')
                            .style('text-align', (d,i) => i === 0 ? 'right' : 'left')
                            .text((d,i) => i === 0 ? d + ':' : d);
                }
            });
    }
    
    //get normal values and adjust domain
    multiples.on("layout", function(){

        //header formatting
        this.wrap.selectAll(".wc-chart-title").style("display","block");

        //set width of container
        this.wrap
            .style("width",this.config.width*1.1)
            .style("display","block");

        //remove padding/margins
        this.wrap.selectAll(".wc-chart").style("padding-bottom","2px")

        //border between multiple
        this.wrap.selectAll(".wc-chart-title").style("border-top","1px solid #eee")
        //set y scale based on values & normal range
        var filtered_data = this.raw_data.filter(f => {
            return f[this.filters[0].col] === this.filters[0].val;
        })
        var normlovals = filtered_data
            .map(m => +m[chart.config.normal_col_low])
            .filter(f => +f || +f === 0);
        
        var normhivals = filtered_data
            .map(m => +m[chart.config.normal_col_high])
            .filter(f => +f || +f === 0);

        var normlo = Math.min.apply(null, normlovals);
        var normhi = Math.max.apply(null, normhivals);
        
        var yvals = filtered_data
            .map(m => +m[chart.config.y.column])
            .filter(f => +f || +f === 0 );

        var ylo = min(yvals);
        var yhi = max(yvals);
        var ymin = min([ylo, normlo]);
        var ymax = max([yhi, normhi]);

        this.config.y_dom = [ymin, ymax];
    });
    
    multiples.on('draw', function(){
        //borrow same domain for x
        this.x_dom = chart.x.domain();
    });
    
    multiples.on("resize", function(){
        //draw normal range
        rangePolygon(this);

        // axis tweaks
        var units = this.current_data[0].values.raw[0][chart.config.unit_col];
        this.svg.select(".y.axis").select(".axis-title").text(units);
        this.svg.select(".x.axis").select(".axis-title").remove();

        //delete the legend
        this.legend.remove();
    });
    
    var ptData = chart.raw_data.filter(f => f[chart.config.id_col] === id[chart.config.id_col] );

    multiply(multiples, ptData, chart.config.measure_col);
}
