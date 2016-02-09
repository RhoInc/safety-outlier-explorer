import { set } from 'd3';
import { dataOps } from 'webcharts';
import addBoxplot from './addBoxplot';
import smallMult from './smallMultiples';

export default function onResize(){
    const config = this.config;
    const chart = this;
    function highlight(id){
        var myLine = chart.svg.selectAll(".line")
        .filter(function(d){return d.values[0].values.raw[0][config.id_col] === id})
        
        var myPoints = chart.svg.selectAll(".point").filter(function(d){return false})

        myLine.select("path").attr("stroke-width",4)
        myPoints.select("circle").attr("r",4)
    }

    function clearHighlight(){
        chart.svg.selectAll(".line").select("path").attr("stroke-width",.5)
        chart.svg.selectAll(".point").select("cirlce").attr("r",2)
    }

    //Set up event listeners on lines and points
    var mainChart = this;
    this.svg.selectAll(".line")
    .on("mouseover",function(d){ 
        var id = d.values[0].values.raw[0][config.id_col]
        highlight(id)
    })
    .on("mouseout",clearHighlight)
    .on("click",function(d){
        var id = d.values[0].values.raw[0][config.id_col]
        smallMult(id, mainChart);
    })

    this.svg.selectAll(".point")
    .on("mouseover",function(d){ 
        var id = d.values.raw[0][config.id_col]
        highlight(id)
    })
    .on("mouseout",clearHighlight)
    .on("click",function(d){
        var id = d.values.raw[0][config.id_col]
        smallMult(id, mainChart);
    })

    // var units = this.current_data[0].values.raw[0][config.unit_col]
    // var measure = this.current_data[0].values.raw[0][config.measure_col]

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
    this.svg.select("g.boxplot").attr("transform", "translate(" + (this.plot_width + this.config.margin.right/2) + ",0)")
}