(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react'), require('d3'), require('webcharts')) :
	typeof define === 'function' && define.amd ? define(['react', 'd3', 'webcharts'], factory) :
	(global.safetyOutlierExplorer = factory(global.React,global.d3,global.webCharts));
}(this, function (React,d3$1,webcharts) { 'use strict';

	React = 'default' in React ? React['default'] : React;

	function stringAccessor(o, s, v) {
		//adapted from http://jsfiddle.net/alnitak/hEsys/
	    s = s.replace(/\[(\w+)\]/g, '.$1');
	    s = s.replace(/^\./, '');           
	    var a = s.split('.');
	    for (var i = 0, n = a.length; i < n; ++i) {
	        var k = a[i];
	        if (k in o) {
	            if(i == n-1 && v !== undefined)
	                o[k] = v;
	            o = o[k];
	        } else {
	            return;
	        }
	    }
	    return o;
	}

	var binding = {
		dataMappings : [    
			//Custom Settings
			{
				source:"id_col",
				target:"id_col"
			},
			{
				source:"time_cols",
				target:"time_cols"
			},
			{
				source:"measure_col",
				target:"measure_col"
			},
			{
				source:"value_col",
				target:"value_col"
			},
			{
				source:"unit_col",
				target:"unit_col"
			},
			{
				source:"normal_col_low",
				target:"normal_col_low"
			},
			{
				source:"normal_col_high",
				target:"normal_col_high"
			},
			//WebCharts defaults
			{
				source:"x",
				target:"x.column"
			},
			{
				source:"x_order",
				target:"x.order"
			},
			{
				source:"x_domain",
				target:"x.domain"
			},
			{
				source:"y",
				target:"y.column"
			},
			{
				source:"y_order",
				target:"y.order"
			},
			{
				source:"y_domain",
				target:"y.domain"
			},
			{
				source:"group",
				target:"marks.0.per"
			},
			{
				source:"subgroup",
				target:"marks.0.split"
			},
			{
				source:"subset",
				target:"marks.0.values"
			},
			{
				source:"color_by",
				target:"color_by"
			},
			{
				source:"legend_order",
				target:"legend.order"
			},
			{
				source:"tooltip",
				target:"marks.0.tooltip"
			}
		],
		chartProperties: [
			//Custom Settings
			//WebCharts defaults
			{
				source:"start_value",
				target:"start_value"
			},
			{
				source:"date_format",
				target:"date_format"
			},
			{
				source:"x_label",
				target:"x.label"
			},

			{
				source:"x_type",
				target:"x.type"
			},
			{
				source:"x_format",
				target:"x.format"
			},
			{
				source:"x_sort",
				target:"x.sort"
			},
			{
				source:"x_bin",
				target:"x.bin"
			},
			{
				source:"x_behavior",
				target:"x.behavior"
			},
			{
				source:"y_label",
				target:"y.label"
			},
			{
				source:"y_type",
				target:"y.type"
			},
			{
				source:"y_format",
				target:"y.format"
			},
			{
				source:"y_sort",
				target:"y.sort"
			},
			{
				source:"y_behavior",
				target:"y.behavior"
			},
			{
				source:"marks_type",
				target:"marks.0.type"
			},
			{
				source:"marks_summarizeX",
				target:"marks.0.summarizeX"
			},
			{
				source:"marks_summarizeY",
				target:"marks.0.summarizeY"
			},
			{
				source:"marks_arrange",
				target:"marks.0.arrange"
			},
			{
				source:"marks_fill_opacity",
				target:"marks.0.attributes.fill-opacity"
			},
			{
				source:"aspect_ratio",
				target:"aspect"
			},
			{
				source:"range_band",
				target:"range_band"
			},
			{
				source:"colors",
				target:"colors"
			},
			{
				source:"gridlines",
				target:"gridlines"
			},
			{
				source:"max_width",
				target:"max_width"
			},
			{
				source:"resizable",
				target:"resizable"
			},
			{
				source:"scale_text",
				target:"scale_text"
			},
			{
				source: "legend_mark",
				target: "legend.mark"
			},
			{
				source: "legend_label",
				target: "legend.label"
			}
		]
	}

	const settings = {
	    //Addition settings for this template
	    id_col: "USUBJID",
	    time_cols: ["VISITN","VISIT","DY"],
	    measure_col: "TEST",
	    value_col: "STRESN",
	    unit_col: "STRESU",
	    normal_col_low: "STNRLO",
	    normal_col_high: "STNRHI",
	    start_value: null,

	    //Standard webcharts settings
	    x:{
	        column:null, //set in syncSettings()
	        type:"linear",
	        behavior:"flex",
	        tickAttr: null
	    },
	    y:{
	        column:null, //set in syncSettings()
	        stat:"mean",
	        type:"linear",
	        label:"Value",
	        behavior:"flex",
	        format:"0.2f"
	    },
	    marks:[
	        {
	            per:null, //set in syncSettings()
	            type:"line",
	            attributes:{
	                'stroke-width': .5, 
	                'stroke-opacity': .5 ,
	                "stroke":"#999"
	            },
	            tooltip:null //set in syncSettings()

	        },
	        {
	            per:null, //set in syncSettings()
	            type:"circle",
	            radius:2,
	            attributes:{
	                'stroke-width': .5, 
	                'stroke-opacity': .5,
	                'fill-opacity':1
	            },
	            tooltip:null //set in syncSettings()
	        }
	    ],
	    resizable:true,
	    max_width: 600,
	    margin:{right:20},
	    aspect: 1.33
	};

	// Replicate settings in multiple places in the settings object
	function syncSettings(settings){
	    settings.y.column = settings.value_col;
	    settings.x.column = settings.time_cols[0];
	    settings.marks[0].per = [settings.id_col, settings.measure_col];
	    settings.marks[0].tooltip = `[${settings.id_col}]`;
	    settings.marks[1].per = [
	        settings.id_col, 
	        settings.measure_col,
	        settings.time_cols[0],
	        settings.value_col
	    ];
	    settings.marks[1].tooltip = `[${settings.id_col}]:  [${settings.value_col}] [${settings.unit_col}] at ${settings.x.column} = [${settings.x.column}]`;
	    return settings;
	}

	// Default Control objects
	const controlInputs = [ 
	 	{label: "Lab Test", type: "subsetter", start: null},
	    {type: "dropdown", label: "X axis", option: "x.column", require: true}
	];

	// Map values from settings to control inputs
	function syncControlInputs(controlInputs, settings){
	    var labTestControl = controlInputs.filter(function(d){return d.label=="Lab Test"})[0]     
	    labTestControl.value_col = settings.measure_col;

	    var xAxisControl = controlInputs.filter(function(d){return d.label=="X axis"})[0]     
	    xAxisControl.values = settings.time_cols;

	    return controlInputs
	}

	function onInit(){
	    const config = this.config;
	    const allMeasures = d3$1.set(this.raw_data.map(m => m[config.measure_col])).values();
	    this.controls.config.inputs.filter(f => f.value_col === config.measure_col)[0].start = config.start_value || allMeasures[0];

	    //warning for non-numeric endpoints
	    var catMeasures = allMeasures
	        .filter(f => {
	            var measureVals = this.raw_data
	                .filter(d => d[config.measure_col] === f);

	            return webcharts.dataOps.getValType(measureVals, config.value_col) !== "continuous";
	        });
	    if(catMeasures.length){
	        console.warn(catMeasures.length + " non-numeric endpoints have been removed: "+catMeasures.join(", "))    
	    }
	    
	    //delete non-numeric endpoints
	    var numMeasures = allMeasures
	        .filter(f => {
	            var measureVals = this.raw_data
	                .filter(d => d[config.measure_col] === f );

	            return webcharts.dataOps.getValType(measureVals, config.value_col) === "continuous";
	        });

	    this.raw_data = this.raw_data.filter(f => numMeasures.indexOf(f[config.measure_col]) > -1 );

	};

	function onLayout(){
	    //custom filter behavior           
	    var xColSelect = this.controls.wrap.selectAll(".control-group")
	        .filter(f => f.option === "x.column")
	        .select("select")
	        
	    xColSelect.on("change", d => {
	            var value = xColSelect.property('value');

	            this.config.x.column = value;
	            this.config.marks[1].per[2] = value;

	            //DY is a hardcoded variable...
	            this.config.x.type = value == "DY" ? "linear" : "ordinal";
	            this.draw();
	        });

	    //add wrapper for small multiples
	    this.wrap.append('div').attr('class', 'multiples');
	}

	function onDataTransform(){
		var config = this.config;
		var units = this.filtered_data[0][config.unit_col];
	    var measure = this.filtered_data[0][config.measure_col];
	    this.config.y.label = measure+" level ("+units+")";
	    this.config.x.label = this.config.x.column;
	}

	function onDraw(){
	    //clear current multiples
	    this.wrap.select('.multiples').select('.wc-small-multiples').remove();
	}

	function addBoxplot(svg, results, height, width, domain, boxPlotWidth, boxColor, boxInsideColor, format, horizontal){
	    //set default orientation to "horizontal"
	    var horizontal = horizontal==undefined ? true : horizontal 

	    //make the results numeric and sort
	    var results = results.map(function(d){return +d}).sort(d3.ascending)

	    //set up scales
	    var y = d3.scale.linear()
	    .range([height, 0])

	    var x = d3.scale.linear()
	    .range([0, width])

	    if(horizontal){
	        y.domain(domain)
	    }else{
	        x.domain(domain)
	    }

	    var probs=[0.05,0.25,0.5,0.75,0.95];
	    for(var i=0; i<probs.length; i++){
	        probs[i]=d3.quantile(results, probs[i])
	    }

	    var boxplot = svg.append("g")
	    .attr("class","boxplot")
	    .datum({values:results, probs:probs})

	    //set bar width variable
	    var left=horizontal ? 0.5-boxPlotWidth/2 : null
	    var right=horizontal ? 0.5+boxPlotWidth/2 : null
	    var top = horizontal ? null : 0.5-boxPlotWidth/2 
	    var bottom = horizontal ? null : 0.5+boxPlotWidth/2

	    //draw rectangle from q1 to q3
	    var box_x = horizontal ? x(0.5-boxPlotWidth/2) : x(probs[1])
	    var box_width = horizontal ? x(0.5+boxPlotWidth/2)-x(0.5-boxPlotWidth/2) : x(probs[3])-x(probs[1])
	    var box_y = horizontal ? y(probs[3]) : y(0.5+boxPlotWidth/2)
	    var box_height = horizontal ? (-y(probs[3])+y(probs[1])) : y(0.5-boxPlotWidth/2)-y(0.5+boxPlotWidth/2)

	    boxplot.append("rect")
	    .attr("class", "boxplot fill")
	    .attr("x", box_x)
	    .attr("width", box_width)
	    .attr("y", box_y)
	    .attr("height", box_height)
	    .style("fill", boxColor);

	    //draw dividing lines at median, 95% and 5%
	    var iS=[0,2,4];
	    var iSclass=["","median",""];
	    var iSColor=[boxColor, boxInsideColor, boxColor]
	    for(var i=0; i<iS.length; i++){
	        boxplot.append("line")
	        .attr("class", "boxplot "+iSclass[i])
	        .attr("x1", horizontal ? x(0.5-boxPlotWidth/2) : x(probs[iS[i]]))
	        .attr("x2", horizontal ? x(0.5+boxPlotWidth/2) : x(probs[iS[i]]))
	        .attr("y1", horizontal ? y(probs[iS[i]]) : y(0.5-boxPlotWidth/2))
	        .attr("y2", horizontal ? y(probs[iS[i]]) : y(0.5+boxPlotWidth/2))
	        .style("fill", iSColor[i])
	        .style("stroke", iSColor[i])
	    }

	    //draw lines from 5% to 25% and from 75% to 95%
	    var iS=[[0,1],[3,4]];
	    for(var i=0; i<iS.length; i++){
	        boxplot.append("line")
	        .attr("class", "boxplot")
	        .attr("x1", horizontal ? x(0.5) : x(probs[iS[i][0]]))
	        .attr("x2", horizontal ? x(0.5) : x(probs[iS[i][1]]))
	        .attr("y1", horizontal ? y(probs[iS[i][0]]) : y(0.5))
	        .attr("y2", horizontal ? y(probs[iS[i][1]]) : y(0.5))
	        .style("stroke", boxColor);
	    }

	    boxplot.append("circle")
	    .attr("class", "boxplot mean")
	    .attr("cx", horizontal ? x(0.5):x(d3.mean(results)))
	    .attr("cy", horizontal ? y(d3.mean(results)):y(0.5))
	    .attr("r", horizontal ? x(boxPlotWidth/3) : y(1-boxPlotWidth/3))
	    .style("fill", boxInsideColor)
	    .style("stroke", boxColor);

	    boxplot.append("circle")
	    .attr("class", "boxplot mean")
	    .attr("cx", horizontal ? x(0.5):x(d3.mean(results)))
	    .attr("cy", horizontal ? y(d3.mean(results)):y(0.5))
	    .attr("r", horizontal ? x(boxPlotWidth/6) : y(1-boxPlotWidth/6))
	    .style("fill", boxColor)
	    .style("stroke", 'None');

	    var formatx = format ? d3.format(format) : d3.format(".2f");

	    boxplot.selectAll(".boxplot").append("title").text(function(d){
	        return "N = "+d.values.length+"\n"+
	        "Min = "+d3.min(d.values)+"\n"+
	        "5th % = "+formatx(d3.quantile(d.values, 0.05))+"\n"+
	        "Q1 = "+formatx(d3.quantile(d.values, 0.25))+"\n"+
	        "Median = "+formatx(d3.median(d.values))+"\n"+
	        "Q3 = "+formatx(d3.quantile(d.values, 0.75))+"\n"+
	        "95th % = "+formatx(d3.quantile(d.values, 0.95))+"\n"+
	        "Max = "+d3.max(d.values)+"\n"+
	        "Mean = "+formatx(d3.mean(d.values))+"\n"+
	        "StDev = "+formatx(d3.deviation(d.values));
	    });
	}

	function rangePolygon (chart){

	    var area = d3$1.svg.area()
	        .x(function(d){ 
	            return chart.x(d["TIME"])
	        }) 
	        .y0(function(d){ 
	            var lbornlo = d['STNRLO'];
	            return lbornlo !== 'NA' ? chart.y(+lbornlo) : 0
	        })
	        .y1(function(d) { 
	            var lbornrhi = d['STNRHI'];
	            return lbornrhi !== 'NA' ? chart.y(+lbornrhi) : 0
	        });

	    var dRow = chart.filtered_data[0];

	    var myRows = chart.x_dom.slice().map(m => {
	        return {
	            STNRLO: dRow[chart.config.normal_col_low],
	            STNRHI: dRow[chart.config.normal_col_high],
	            TIME: m
	        };
	    });
	    //remove what is there now
	    chart.svg.select('.norms').remove();
	    //add new
	    chart.svg.append("path")
	        .datum(myRows)
	        .attr("class","norms")
	        .attr("fill","blue")
	        .attr("fill-opacity",0.1)
	        .attr("d",area);
	}

	function smallMultiples(id, chart) {
	    //clear current multiples
		chart.wrap.select('.multiples').select('.wc-small-multiples').remove();
	    //Establish settings for small multiples based off of the main chart
	    //NOTE: will likely need polyfill for Object.assign
	    var mult_settings = Object.assign({}, chart.config, Object.getPrototypeOf(chart.config));
	    mult_settings.aspect = 5.4;
	    mult_settings.margin = {bottom:20};
	    var multiples = webcharts.createChart(chart.wrap.select('.multiples').node(), mult_settings, null);

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

	        var ylo = d3$1.min(yvals);
	        var yhi = d3$1.max(yvals);
	        var ymin = d3$1.min([ylo, normlo]);
	        var ymax = d3$1.max([yhi, normhi]);

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
	    
	    var ptData = chart.raw_data.filter(f => f[chart.config.id_col] === id );

	    webcharts.multiply(multiples, ptData, chart.config.measure_col);
	}

	function adjustTicks(axis, dx, dy, rotation, anchor){
	  if(!axis)
	    return;
	  this.svg.selectAll("."+axis+".axis .tick text")
	    .attr({
	        "transform": "rotate("+rotation+")",
	        "dx": dx,
	        "dy": dy
	    })
	    .style("text-anchor", anchor || 'start');
	}

	function onResize(){
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

	        smallMultiples(id, mainChart);
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

	        smallMultiples(id, mainChart);
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
	    if (config.x.tickAttr) {
	        adjustTicks.call(this, 'x', 0, 0, config.x.tickAttr.rotate, config.x.tickAttr.anchor);
	    } 
	}

	if (typeof Object.assign != 'function') {
	  (function () {
	    Object.assign = function (target) {
	      'use strict';
	      if (target === undefined || target === null) {
	        throw new TypeError('Cannot convert undefined or null to object');
	      }

	      var output = Object(target);
	      for (var index = 1; index < arguments.length; index++) {
	        var source = arguments[index];
	        if (source !== undefined && source !== null) {
	          for (var nextKey in source) {
	            if (source.hasOwnProperty(nextKey)) {
	              output[nextKey] = source[nextKey];
	            }
	          }
	        }
	      }
	      return output;
	    };
	  })();
	}

	function yourFunctionNameHere(element, settings$$){
		
		//merge user's settings with defaults
		let mergedSettings = Object.assign({}, settings, settings$$);

		//keep settings in sync with the data mappings
		mergedSettings = syncSettings(mergedSettings);
		
		//keep control inputs in sync and create controls object (if needed)
		let syncedControlInputs = syncControlInputs(controlInputs, mergedSettings);
		let controls = webcharts.createControls(element, {location: 'top', inputs: syncedControlInputs});
		
		//create chart
		let chart = webcharts.createChart(element, mergedSettings, controls);
		chart.on('init', onInit);
		chart.on('layout', onLayout);
		chart.on('datatransform', onDataTransform);
		chart.on('draw', onDraw);
		chart.on('resize', onResize);

		return chart;
	}

	class ReactYourProjectName extends React.Component {
		constructor(props) {
			super(props);
			this.state = {};
		}
		componentDidMount(prevProps, prevState){
			if(this.props.data.length){
				//manually clear div and redraw
				d3$1.select(`.chart-div.id-${this.props.id}`).selectAll('*').remove();
				let chart = yourFunctionNameHere(`.chart-div.id-${this.props.id}`, this.props.settings).init(this.props.data);
			}
		}
		componentDidUpdate(prevProps, prevState){
			if(this.props.data.length){
				//manually clear div and redraw
				d3$1.select(`.chart-div.id-${this.props.id}`).selectAll('*').remove();
				let chart = yourFunctionNameHere(`.chart-div.id-${this.props.id}`, this.props.settings).init(this.props.data);
			}
		}
		render(){
			return (
				React.createElement('div', {
					key: this.props.id,
					className: `chart-div id-${this.props.id} ${!(this.props.data.length) ? 'loading' : ''}`,
					style: { minHeight: '1px', minWidth: '1px' }
				})
			);
		}
	}

	ReactYourProjectName.defaultProps = {data: [], controlInputs: [], id: 'id'}

	function describeCode(props) {
	  const settings = this.createSettings(props);
	  const code =
	`// uses d3 v.${d3$1.version}
// uses webcharts v.${webcharts.version}
// uses safety-outlier-explorer v.1.2.0

var settings = ${JSON.stringify(settings, null, 2)};

var myChart = safetyOutlierExplorer(dataElement, settings);

d3.csv(dataPath, function(error, csv) {
  myChart.init(csv);
});
`;
	  return code;
	}


	class Renderer extends React.Component {
	  constructor(props) {
	    super(props);
	    this.binding = binding;
	    this.describeCode = describeCode.bind(this);
	    this.state = { data: [], settings: {}, template: {}, loadMsg: 'Loading...' };
	  }
	  createSettings(props) {
	    // set placeholders for anything the user can change
	    const shell = settings;

	    binding.dataMappings.forEach(e => {
	      let chartVal = stringAccessor(props.dataMappings, e.source);
	      if (chartVal) {
	        stringAccessor(shell, e.target, chartVal);
	      }
	      else {
	        let defaultVal = stringAccessor(props.template.dataMappings, e.source+'.default');
	        if (defaultVal && typeof defaultVal === 'string' && defaultVal.slice(0,3) === 'dm$') {
	          var pointerVal = stringAccessor(props.dataMappings, defaultVal.slice(3)) || null;
	          stringAccessor(shell, e.target, pointerVal);
	        }
	        else if(defaultVal){
	          stringAccessor(shell, e.target, defaultVal);
	        }
	      }
	    });
	    binding.chartProperties.forEach(e => {
	      let chartVal = stringAccessor(props.chartProperties, e.source);
	      if (chartVal !== undefined) {
	        stringAccessor(shell, e.target, chartVal);
	      }
	      else {
	        let defaultVal = stringAccessor(props.template.chartProperties, e.source+'.default');
	        stringAccessor(shell, e.target, defaultVal);
	      }
	    });

	    return syncSettings(shell);
	  }
	  componentWillMount() {
	    var settings = this.createSettings(this.props);
	    this.setState({ settings });
	  }
	  componentWillReceiveProps(nextProps){
	    var settings = this.createSettings(nextProps);
	    this.setState({ settings });
	  }
	  render() {
	    return (
	      React.createElement(ReactYourProjectName, {
	        id: this.props.id,
	        settings: this.state.settings,
	        controlInputs: this.props.template.controls,
	        data: this.props.data
	      })
	    );
	  }
	}

	return Renderer;

}));