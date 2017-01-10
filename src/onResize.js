import { set } from 'd3';
import { dataOps } from 'webcharts';
import addBoxplot from './util/addBoxplot';
import smallMult from './smallMultiples';
import adjustTicks from './util/adjust-ticks';

export default function onResize(){
    const config = this.config;
    const chart = this;
    function highlight(id){
        var myLine = chart.svg.selectAll(".line")
        .filter(function(d){return d.values[0].values.raw[0][config.id_col] === id})
        
        var myPoints = chart.svg.selectAll(".point").filter(function(d){return d.values.raw[0][config.id_col] === id})

        myLine.select("path").attr("stroke-width",4)
        myPoints.select("circle").attr("r",4)
    }

    function clearHighlight(){
        chart.svg.selectAll(".line:not(.selected)").select("path").attr("stroke-width",.5)
        chart.svg.selectAll(".point:not(.selected)").select("circle").attr("r",2)
    }

    //Set up event listeners on lines and points
    var mainChart = this;
    this.svg.selectAll(".line")
    .on("mouseover",function(d){ 
        var id = d.values[0].values.raw[0][config.id_col]
        highlight(id)
    })
    .on("mouseout", clearHighlight)
    .on("click",function(d){
        var id = d.values[0].values.raw[0][config.id_col];
        chart.svg.selectAll(".line").classed('selected', false);
        chart.svg.selectAll(".point").classed('selected', false);
        d3.select(this).classed('selected', true);
        chart.svg.selectAll(".point")
        .filter(function(d){return d.values.raw[0][config.id_col] === id})
        .classed('selected', true);

        smallMult(id, mainChart);
        highlight(id);
    })

    this.svg.selectAll(".point")
    .on("mouseover",function(d){ 
        var id = d.values.raw[0][config.id_col]
        highlight(id)
    })
    .on("mouseout",clearHighlight)
    .on("click",function(d){
        var id = d.values.raw[0][config.id_col];

        chart.svg.selectAll(".line").classed('selected', false);
        chart.svg.selectAll(".point").classed('selected', false);
        chart.svg.selectAll(".point")
            .filter(function(d){return d.values.raw[0][config.id_col] === id})
            .classed('selected', true);
        chart.svg.selectAll(".line")
            .filter(function(d){return d.values[0].values.raw[0][config.id_col] === id})
            .classed('selected', true);

        smallMult(id, mainChart);
        highlight(id);
    })


    //draw reference boxplot 
    this.svg.select("g.boxplot").remove()
    var myValues = this.current_data.map(function(d){return d.values.y}) 

    addBoxplot(
        this.svg,
        myValues, 
        this.plot_height, 
        1, 
        this.y_dom, 
        10, 
        "#bbb", 
        "white"
    )
    this.svg.select("g.boxplot").attr("transform", "translate(" + (this.plot_width + this.config.margin.right/2) + ",0)");

    this.svg.select('.overlay').on('click', function(){
        //clear current multiples
        chart.wrap.select('.multiples').select('.wc-small-multiples').remove();
        chart.svg.selectAll(".line").classed('selected', false);
        chart.svg.selectAll(".point").classed('selected', false);
        clearHighlight();
    });

    // rotate ticks
    if (config.rotate_x_tick_labels) {
        adjustTicks.call(this, 'x', -10, 10, -45, 'end');
    } 
}
