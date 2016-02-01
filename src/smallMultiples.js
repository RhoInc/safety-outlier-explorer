import { select } from 'd3';
import { multiply } from 'webcharts';

export default function smallMultiples(id, chart) {

	select(chart.template.element_combined).select('.wc-small-multiples').remove();
    //Establish settings for small multiples based off of the main chart//
    //NOTE: Would probably be better to "clone" settings and then adjust ...//
    var mult_settings = chart.template.config
    mult_settings.x.domain = chart.x_dom
    mult_settings.aspect = 5.4
    mult_settings.margin={bottom:20}
    var multiples = webCharts.createChart(chart.template.element_combined, mult_settings, null);
    multiples.template = chart.template

    //insert a header
    multiples.wrap.insert('strong', '.legend')
    .text('All Measures for '+id);
    
    //get normal values and adjust domain
    multiples.on("layout", function(){

        //header formatting
        this.wrap.selectAll(".wc-chart-title").style("display","block")

        //set width of container
        d3.select(this.div)
        .style("width",this.config.width*1.1)
        .style("display","block")

        //remove padding/margins
        d3.select(this.div).selectAll(".wc-chart").style("padding-bottom","2px")

        //border between multiple
        d3.select(this.div).selectAll(".wc-chart-title").style("border-top","1px solid #eee")
        //set y scale based on values & normal range
        var myChart = this;
        var filtered_data = this.raw_data.filter(function(d){
            return d[myChart.filters[0].col]==myChart.filters[0].val
        })
        var normlovals = filtered_data
        .map(function(m){return +m["STNRLO"]})
        .filter(function(f){return +f || +f === 0});
        
        var normhivals = filtered_data
        .map(function(m){return +m["STNRHI"]})
        .filter(function(f){return +f || +f === 0});

        var normlo = d3.min(normlovals);
        var normhi = d3.max(normhivals);
        
        var yvals = filtered_data
        .map(function(m){return +m[chart.config.y.column]})
        .filter(function(f){return +f || +f === 0})

        //console.log(yvals)
        var ylo = d3.min(yvals);
        var yhi = d3.max(yvals);
        var ymin = d3.min([ylo, normlo]);
        var ymax = d3.max([yhi, normhi]);

        this.config.y_dom = [ymin, ymax];
        //console.log(this.config.y_dom)
    })
    
    multiples.on("resize", function(){
        //draw normal range
        chart.template.lib.rangePolygon(this) 

        // axis tweaks
        var units = this.current_data[0].values.raw[0].STRESU
        this.svg.select(".y.axis").select(".axis-title").text(units)
        this.svg.select(".x.axis").select(".axis-title").remove()

        //delete the legend
        this.legend.remove()
    } )
    
    var ptData = chart
    .raw_data
    .filter(function(f){return f['USUBJID'] === id})

    multiply(multiples,ptData,'TEST')
}