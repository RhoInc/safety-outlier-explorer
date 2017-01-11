import { select, min, max } from 'd3';
import { multiply, createChart } from 'webcharts';
import rangePolygon from './util/rangePolygon';
import adjustTicks from './util/adjust-ticks';

export default function smallMultiples(id, chart) {
  //Clear current multiples.
    chart.wrap.select('.multiples').select('.wc-small-multiples').remove();

  //Define small multiples settings.
    var mult_settings = Object.assign({}, chart.config, Object.getPrototypeOf(chart.config));
    mult_settings.resizable = false; // prevent different-sized small multiples
    mult_settings.height = 100 + mult_settings.margin.bottom; // hard code height
    var multiples = createChart(chart.wrap.select('.multiples').node(), mult_settings, null);

    //insert a header
    multiples.wrap.insert('strong', '.legend').text('All Measures for '+id);
    
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
      //Resize text manually.
        this.wrap.select('.wc-chart-title')
            .style('font-size', '12px');
        this.svg.selectAll('.axis .tick text')
            .style('font-size', '10px');

        //draw normal range
        rangePolygon(this);

        // axis tweaks
        var units = this.current_data[0].values.raw[0][chart.config.unit_col];
        this.svg.select(".y.axis").select(".axis-title").text(units);
        this.svg.select(".x.axis").select(".axis-title").remove();

        //delete the legend
        this.legend.remove();

        // rotate ticks
        if (chart.config.rotate_x_tick_labels) {
            adjustTicks.call(this, 'x', -10, 10, -45, 'end');
        } 
    });
    
    var ptData = chart.raw_data.filter(f => f[chart.config.id_col] === id );

    multiply(multiples, ptData, chart.config.measure_col);
}
