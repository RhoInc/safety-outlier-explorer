var safetyOutlierExplorer = function (webcharts, d3$1) {
    'use strict';

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

    const settings = {
        //Custom settings for this template
        id_col: 'USUBJID',
        time_cols: [{ value_col: 'DY',
            type: 'linear',
            label: 'Study Day',
            rotate_tick_labels: false,
            vertical_space: 0 }, { value_col: 'VISITN',
            type: 'ordinal',
            label: 'Visit Number',
            rotate_tick_labels: false,
            vertical_space: 0 }, { value_col: 'VISIT',
            type: 'ordinal',
            label: 'Visit',
            rotate_tick_labels: true,
            vertical_space: 100 } // Specify vertical space for rotated tick labels.  Maps to [margin.bottom].
        ],
        measure_col: 'TEST',
        value_col: 'STRESN',
        unit_col: 'STRESU',
        normal_col_low: 'STNRLO',
        normal_col_high: 'STNRHI',
        start_value: null,
        filters: null,
        custom_marks: null,
        details: [{ value_col: 'AGE', label: 'Age' }, { value_col: 'SEX', label: 'Sex' }, { value_col: 'RACE', label: 'Race' }],
        multiples_sizing: { width: 300,
            height: 100 },

        //Standard webCharts settings
        x: {
            column: null, //set in syncSettings()
            type: null, //set in syncSettings()
            behavior: 'flex'
        },
        y: {
            column: null, //set in syncSettings()
            stat: 'mean',
            type: 'linear',
            label: 'Value',
            behavior: 'flex',
            format: '0.2f'
        },
        marks: [{
            per: null, //set in syncSettings()
            type: 'line',
            attributes: {
                'stroke-width': .5,
                'stroke-opacity': .5,
                'stroke': '#999'
            },
            tooltip: null //set in syncSettings()

        }, {
            per: null, //set in syncSettings()
            type: 'circle',
            radius: 2,
            attributes: {
                'stroke-width': .5,
                'stroke-opacity': .5,
                'fill-opacity': 1
            },
            tooltip: null //set in syncSettings()
        }],
        resizable: true,
        margin: { right: 20 }, //create space for box plot
        aspect: 3
    };

    // Replicate settings in multiple places in the settings object
    function syncSettings(settings) {
        const time_col = settings.time_cols[0];

        settings.x.column = time_col.value_col;
        settings.x.type = time_col.type;
        settings.x.label = time_col.label;

        settings.y.column = settings.value_col;

        settings.marks[0].per = [settings.id_col, settings.measure_col];
        settings.marks[0].tooltip = `[${settings.id_col}]`;

        settings.marks[1].per = [settings.id_col, settings.measure_col, time_col.value_col, settings.value_col];
        settings.marks[1].tooltip = `[${settings.id_col}]:  [${settings.value_col}] [${settings.unit_col}] at ${settings.x.column} = [${settings.x.column}]`;

        //Add custom marks to settings.marks.
        if (settings.custom_marks) settings.custom_marks.forEach(mark => settings.marks.push(mark));

        //Define margins for box plot and rotated x-axis tick labels.
        if (settings.margin) settings.margin.bottom = time_col.vertical_space;else settings.margin = { right: 20,
            bottom: time_col.vertical_space };

        settings.rotate_x_tick_labels = time_col.rotate_tick_labels;

        return settings;
    }

    // Default Control objects
    const controlInputs = [{ label: 'Measure', type: 'subsetter', start: null }, { type: 'dropdown', label: 'X axis', option: 'x.column', require: true }];

    // Map values from settings to control inputs
    function syncControlInputs(controlInputs, settings) {
        let labTestControl = controlInputs.filter(d => d.label === 'Measure')[0];
        labTestControl.value_col = settings.measure_col;

        let xAxisControl = controlInputs.filter(d => d.label === 'X axis')[0];
        xAxisControl.values = settings.time_cols.map(d => d.value_col);

        if (settings.filters) settings.filters.reverse().forEach((d, i) => {
            const thisFilter = { type: 'subsetter',
                value_col: d.value_col ? d.value_col : d,
                label: d.label ? d.label : d.value_col ? d.value_col : d };
            controlInputs.push(thisFilter);
        });

        return controlInputs;
    }

    function onInit() {
        const config = this.config;
        const allMeasures = d3$1.set(this.raw_data.map(m => m[config.measure_col])).values();
        this.controls.config.inputs.filter(f => f.value_col === config.measure_col)[0].start = config.start_value || allMeasures[0];

        //warning for non-numeric endpoints
        var catMeasures = allMeasures.filter(f => {
            var measureVals = this.raw_data.filter(d => d[config.measure_col] === f);

            return webcharts.dataOps.getValType(measureVals, config.value_col) !== "continuous";
        });
        if (catMeasures.length) {
            console.warn(catMeasures.length + " non-numeric endpoints have been removed: " + catMeasures.join(", "));
        }

        //delete non-numeric endpoints
        var numMeasures = allMeasures.filter(f => {
            var measureVals = this.raw_data.filter(d => d[config.measure_col] === f);

            return webcharts.dataOps.getValType(measureVals, config.value_col) === "continuous";
        });

        //count the number of unique ids in the data set
        this.populationCount = d3.set(this.raw_data.map(d => d[this.config.id_col])).values().length;
        this.raw_data = this.raw_data.filter(f => numMeasures.indexOf(f[config.measure_col]) > -1);
    };

    function onLayout() {
        //Add div for participant counts.
        this.controls.wrap.append('p').classed('annote', true);

        //Define x-axis column control behavior.
        let xColSelect = this.controls.wrap.selectAll('.control-group').filter(f => f.option === 'x.column').select('select');

        //Map column names to column labels.
        xColSelect.selectAll('option').text(d => this.config.time_cols[this.config.time_cols.map(d => d.value_col).indexOf(d)].label);

        //Define event listener.
        xColSelect.on('change', d => {
            const time_col = this.config.time_cols[this.config.time_cols.map(di => di.label).indexOf(xColSelect.property('value'))];

            //Redefine settings properties based on x-axis column selection.
            this.config.x.column = time_col.value_col;
            this.config.x.type = time_col.type;
            this.config.x.label = time_col.label;
            this.config.marks[1].per[2] = time_col.value_col;
            this.config.rotate_x_tick_labels = time_col.rotate_tick_labels;
            this.config.margin.bottom = time_col.vertical_space;

            this.draw();
        });

        //Add wrapper for small multiples.
        this.wrap.append('div').attr('class', 'multiples');
    }

    function onPreprocess() {
        //Define x- and y-axis ranges based on currently selected measure.
        const config = this.config;
        const measure = this.controls.wrap.selectAll('.control-group').filter(d => d.value_col && d.value_col === config.measure_col).select('option:checked').text();
        const measure_data = this.raw_data.filter(d => d[config.measure_col] === measure);
        this.config.x.domain = config.x.type === 'ordinal' ? d3.set(measure_data.map(d => d[config.x.column])).values() : d3.extent(measure_data, d => +d[config.x.column]);
        this.config.y.domain = d3.extent(measure_data, d => +d[config.value_col]);
    }

    function onDataTransform() {
        //Define y-axis label.
        const measure = this.filters.filter(filter => filter.col === this.config.measure_col)[0].val;
        const measureData = this.raw_data.filter(d => d[this.config.measure_col] === measure);
        this.config.y.label = `${measureData[0][this.config.measure_col]} (` + `${measureData[0][this.config.unit_col]})`;
    }

    /*------------------------------------------------------------------------------------------------\
      Annotate number of participants based on current filters, number of participants in all, and
      the corresponding percentage.
      Inputs:
        chart - a webcharts chart object
        id_col - a column name in the raw data set (chart.raw_data) representing the observation of interest
        id_unit - a text string to label the units in the annotation (default = 'participants')
        selector - css selector for the annotation
    \------------------------------------------------------------------------------------------------*/

    function updateSubjectCount(chart, id_col, selector, id_unit) {
        const totalObs = chart.populationCount;

        //count the number of unique ids in the current chart and calculate the percentage
        const currentObs = d3.set(chart.raw_data.filter(d => {
            let filtered = false;

            chart.filters.forEach(filter => {
                if (!filtered && filter.val !== 'All') filtered = d[filter.col] !== filter.val;
            });

            return !filtered;
        }).map(d => d[id_col])).values().length;

        const percentage = d3.format('0.1%')(currentObs / totalObs);

        //clear the annotation
        let annotation = d3.select(selector);
        annotation.selectAll('*').remove();

        //update the annotation
        const units = id_unit ? ' ' + id_unit : ' participant(s)';
        annotation.text(currentObs + ' of ' + totalObs + units + ' shown (' + percentage + ')');
    }

    function onDraw() {
        //Annotate sample and population counts.
        updateSubjectCount(this, this.config.id_col, '.annote');

        //Clear current multiples.
        this.wrap.select('.multiples').select('.wc-small-multiples').remove();
    }

    function addBoxplot(svg, results, height, width, domain, boxPlotWidth, boxColor, boxInsideColor, format, horizontal) {
        //set default orientation to "horizontal"
        var horizontal = horizontal == undefined ? true : horizontal;

        //make the results numeric and sort
        var results = results.map(function (d) {
            return +d;
        }).sort(d3.ascending);

        //set up scales
        var y = d3.scale.linear().range([height, 0]);

        var x = d3.scale.linear().range([0, width]);

        if (horizontal) {
            y.domain(domain);
        } else {
            x.domain(domain);
        }

        var probs = [0.05, 0.25, 0.5, 0.75, 0.95];
        for (var i = 0; i < probs.length; i++) {
            probs[i] = d3.quantile(results, probs[i]);
        }

        var boxplot = svg.append("g").attr("class", "boxplot").datum({ values: results, probs: probs });

        //set bar width variable
        var left = horizontal ? 0.5 - boxPlotWidth / 2 : null;
        var right = horizontal ? 0.5 + boxPlotWidth / 2 : null;
        var top = horizontal ? null : 0.5 - boxPlotWidth / 2;
        var bottom = horizontal ? null : 0.5 + boxPlotWidth / 2;

        //draw rectangle from q1 to q3
        var box_x = horizontal ? x(0.5 - boxPlotWidth / 2) : x(probs[1]);
        var box_width = horizontal ? x(0.5 + boxPlotWidth / 2) - x(0.5 - boxPlotWidth / 2) : x(probs[3]) - x(probs[1]);
        var box_y = horizontal ? y(probs[3]) : y(0.5 + boxPlotWidth / 2);
        var box_height = horizontal ? -y(probs[3]) + y(probs[1]) : y(0.5 - boxPlotWidth / 2) - y(0.5 + boxPlotWidth / 2);

        boxplot.append("rect").attr("class", "boxplot fill").attr("x", box_x).attr("width", box_width).attr("y", box_y).attr("height", box_height).style("fill", boxColor);

        //draw dividing lines at median, 95% and 5%
        var iS = [0, 2, 4];
        var iSclass = ["", "median", ""];
        var iSColor = [boxColor, boxInsideColor, boxColor];
        for (var i = 0; i < iS.length; i++) {
            boxplot.append("line").attr("class", "boxplot " + iSclass[i]).attr("x1", horizontal ? x(0.5 - boxPlotWidth / 2) : x(probs[iS[i]])).attr("x2", horizontal ? x(0.5 + boxPlotWidth / 2) : x(probs[iS[i]])).attr("y1", horizontal ? y(probs[iS[i]]) : y(0.5 - boxPlotWidth / 2)).attr("y2", horizontal ? y(probs[iS[i]]) : y(0.5 + boxPlotWidth / 2)).style("fill", iSColor[i]).style("stroke", iSColor[i]);
        }

        //draw lines from 5% to 25% and from 75% to 95%
        var iS = [[0, 1], [3, 4]];
        for (var i = 0; i < iS.length; i++) {
            boxplot.append("line").attr("class", "boxplot").attr("x1", horizontal ? x(0.5) : x(probs[iS[i][0]])).attr("x2", horizontal ? x(0.5) : x(probs[iS[i][1]])).attr("y1", horizontal ? y(probs[iS[i][0]]) : y(0.5)).attr("y2", horizontal ? y(probs[iS[i][1]]) : y(0.5)).style("stroke", boxColor);
        }

        boxplot.append("circle").attr("class", "boxplot mean").attr("cx", horizontal ? x(0.5) : x(d3.mean(results))).attr("cy", horizontal ? y(d3.mean(results)) : y(0.5)).attr("r", horizontal ? x(boxPlotWidth / 3) : y(1 - boxPlotWidth / 3)).style("fill", boxInsideColor).style("stroke", boxColor);

        boxplot.append("circle").attr("class", "boxplot mean").attr("cx", horizontal ? x(0.5) : x(d3.mean(results))).attr("cy", horizontal ? y(d3.mean(results)) : y(0.5)).attr("r", horizontal ? x(boxPlotWidth / 6) : y(1 - boxPlotWidth / 6)).style("fill", boxColor).style("stroke", 'None');

        var formatx = format ? d3.format(format) : d3.format(".2f");

        boxplot.selectAll(".boxplot").append("title").text(function (d) {
            return "N = " + d.values.length + "\n" + "Min = " + d3.min(d.values) + "\n" + "5th % = " + formatx(d3.quantile(d.values, 0.05)) + "\n" + "Q1 = " + formatx(d3.quantile(d.values, 0.25)) + "\n" + "Median = " + formatx(d3.median(d.values)) + "\n" + "Q3 = " + formatx(d3.quantile(d.values, 0.75)) + "\n" + "95th % = " + formatx(d3.quantile(d.values, 0.95)) + "\n" + "Max = " + d3.max(d.values) + "\n" + "Mean = " + formatx(d3.mean(d.values)) + "\n" + "StDev = " + formatx(d3.deviation(d.values));
        });
    }

    function rangePolygon(chart) {

        var area = d3$1.svg.area().x(function (d) {
            return chart.x(d["TIME"]);
        }).y0(function (d) {
            var lbornlo = d['STNRLO'];
            return lbornlo !== 'NA' ? chart.y(+lbornlo) : 0;
        }).y1(function (d) {
            var lbornrhi = d['STNRHI'];
            return lbornrhi !== 'NA' ? chart.y(+lbornrhi) : 0;
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
        chart.svg.append("path").datum(myRows).attr("class", "norms").attr("fill", "blue").attr("fill-opacity", 0.1).attr("d", area);
    }

    function adjustTicks(axis, dx, dy, rotation, anchor) {
        if (!axis) return;
        this.svg.selectAll("." + axis + ".axis .tick text").attr({
            "transform": "rotate(" + rotation + ")",
            "dx": dx,
            "dy": dy
        }).style("text-anchor", anchor || 'start');
    }

    function smallMultiples(id, chart) {
        //Clear current multiples.
        chart.wrap.select('.multiples').select('.wc-small-multiples').remove();

        //Define small multiples settings.
        let multiples_settings = Object.assign({}, chart.config, Object.getPrototypeOf(chart.config));
        multiples_settings.x.domain = chart.x.domain();
        multiples_settings.y.domain = null;
        multiples_settings.resizable = false;
        multiples_settings.scale_text = false;

        if (multiples_settings.multiples_sizing.width) multiples_settings.width = multiples_settings.multiples_sizing.width;
        if (multiples_settings.multiples_sizing.height) multiples_settings.height = multiples_settings.multiples_sizing.height + (multiples_settings.margin.bottom ? multiples_settings.margin.bottom : 0);

        multiples_settings.margin = { bottom: multiples_settings.margin.bottom || 20 };

        let multiples = webcharts.createChart(chart.wrap.select('.multiples').node(), multiples_settings, null);

        //Insert header.
        multiples.wrap.insert('strong', '.legend').text(`All Measures for ${id[chart.config.id_col]}`);
        let detail_table = multiples.wrap.insert('table', '.legend').append('tbody').classed('detail-listing', true);
        detail_table.append('thead').selectAll('th').data(['', '']).enter().append('th');
        detail_table.append('tbody');

        //Insert a line for each item in [ settings.detail_cols ].
        if (chart.config.details && chart.config.details.length) {
            chart.config.details.forEach(detail => {
                const value_col = detail.value_col ? detail.value_col : detail;

                const label = detail.label ? detail.label : detail.value_col ? detail.value_col : detail;

                if (id[value_col] !== undefined) detail_table.select('tbody').append('tr').selectAll('td').data([label, id[value_col]]).enter().append('td').style('text-align', (d, i) => i === 0 ? 'right' : 'left').text((d, i) => i === 0 ? d + ':' : d);
            });
        }

        //Add styling to small multiples.
        multiples.on('layout', function () {
            this.wrap.style('display', 'block');
            this.wrap.selectAll('.wc-chart-title').style('display', 'block').style('border-top', '1px solid #eee');
            this.wrap.selectAll('.wc-chart').style('padding-bottom', '2px');
            this.config.y.label = this.raw_data.filter(d => d[this.config.filters[0].col] === d[this.config.filters[0].val])[0][this.config.unit_col];
        });

        multiples.on('preprocess', function () {
            //Define y-domain as minimum of lower limit of normal and minimum result and maximum of
            //upper limit of normal and maximum result.
            const filtered_data = this.raw_data.filter(f => f[this.filters[0].col] === this.filters[0].val);

            //Calculate range of normal range.
            const normlo = Math.min.apply(null, filtered_data.map(m => +m[chart.config.normal_col_low]).filter(f => +f || +f === 0));
            const normhi = Math.max.apply(null, filtered_data.map(m => +m[chart.config.normal_col_high]).filter(f => +f || +f === 0));

            //Calculate range of data.
            const ylo = d3$1.min(filtered_data.map(m => +m[chart.config.y.column]).filter(f => +f || +f === 0));
            const yhi = d3$1.max(filtered_data.map(m => +m[chart.config.y.column]).filter(f => +f || +f === 0));

            //Set y-domain.
            this.config.y_dom = [Math.min(normlo, ylo), Math.max(normhi, yhi)];
        });

        multiples.on('resize', function () {
            //Resize text manually.
            this.wrap.select('.wc-chart-title').style('font-size', '12px');
            this.svg.selectAll('.axis .tick text').style('font-size', '10px');

            //Draw normal range.
            if (this.filtered_data.length) rangePolygon(this);

            //Axis tweaks
            //this.svg.select('.y.axis').select('.axis-title').text(this.filtered_data[0][chart.config.unit_col]);
            this.svg.select('.x.axis').select('.axis-title').remove();

            //Delete legend.
            this.legend.remove();

            //Rotate ticks.
            if (chart.config.rotate_x_tick_labels) {
                adjustTicks.call(this, 'x', -10, 10, -45, 'end');
            }
        });

        const ptData = chart.raw_data.filter(f => f[chart.config.id_col] === id[chart.config.id_col]);

        webcharts.multiply(multiples, ptData, chart.config.measure_col);
    }

    function onResize() {
        let chart = this;
        const config = this.config;

        //Highlight lines and point corresponding to an ID.
        function highlight(id) {
            const myLine = chart.svg.selectAll('.line').filter(d => d.values[0].values.raw[0][config.id_col] === id[config.id_col]);
            myLine.select('path').attr('stroke-width', 4);

            const myPoints = chart.svg.selectAll('.point').filter(d => d.values.raw[0][config.id_col] === id[config.id_col]);
            myPoints.select('circle').attr('r', 4);
        }

        //Remove highlighting.
        function clearHighlight() {
            chart.svg.selectAll('.line:not(.selected)').select('path').attr('stroke-width', .5);
            chart.svg.selectAll('.point:not(.selected)').select('circle').attr('r', 2);
        }

        //Set up event listeners on lines and points
        this.svg.selectAll('.line').on('mouseover', function (d) {
            const id = chart.raw_data.filter(di => di[config.id_col] === d.values[0].values.raw[0][config.id_col])[0];
            highlight(id);
        }).on('mouseout', clearHighlight).on('click', function (d) {
            const id = chart.raw_data.filter(di => di[config.id_col] === d.values[0].values.raw[0][config.id_col])[0];

            //Un-select all lines and points.
            chart.svg.selectAll('.line').classed('selected', false);
            chart.svg.selectAll('.point').classed('selected', false);

            //Select line and all points corresponding to selected ID.
            d3.select(this).classed('selected', true);
            chart.svg.selectAll('.point').filter(d => d.values.raw[0][config.id_col] === id[config.id_col]).classed('selected', true);

            //Generate small multiples and highlight marks.
            smallMultiples(id, chart);
            highlight(id);
        });

        this.svg.selectAll('.point').on('mouseover', function (d) {
            const id = chart.raw_data.filter(di => di[config.id_col] === d.values.raw[0][config.id_col])[0];
            highlight(id);
        }).on('mouseout', clearHighlight).on('click', function (d) {
            const id = chart.raw_data.filter(di => di[config.id_col] === d.values.raw[0][config.id_col])[0];

            //Un-select all lines and points.
            chart.svg.selectAll('.line').classed('selected', false);
            chart.svg.selectAll('.point').classed('selected', false);

            //Select line and all points corresponding to selected ID.
            chart.svg.selectAll('.line').filter(function (d) {
                return d.values[0].values.raw[0][config.id_col] === id[config.id_col];
            }).classed('selected', true);
            chart.svg.selectAll('.point').filter(function (d) {
                return d.values.raw[0][config.id_col] === id[config.id_col];
            }).classed('selected', true);

            //Generate small multiples and highlight marks.
            smallMultiples(id, chart);
            highlight(id);
        });

        //draw reference boxplot 
        this.svg.select('g.boxplot').remove();
        var myValues = this.current_data.map(function (d) {
            return d.values.y;
        });

        addBoxplot(this.svg, myValues, this.plot_height, 1, this.y_dom, 10, '#bbb', 'white');
        this.svg.select('g.boxplot').attr('transform', 'translate(' + (this.plot_width + this.config.margin.right / 2) + ',0)');

        this.svg.select('.overlay').on('click', function () {
            //clear current multiples
            chart.wrap.select('.multiples').select('.wc-small-multiples').remove();
            chart.svg.selectAll('.line').classed('selected', false);
            chart.svg.selectAll('.point').classed('selected', false);
            clearHighlight();
        });

        // rotate ticks
        if (config.rotate_x_tick_labels) {
            adjustTicks.call(this, 'x', -10, 10, -45, 'end');
        }
    }

    function safetyOutlierExplorer(element, settings$$) {
        //Merge user settings with default settings.
        let mergedSettings = Object.assign({}, settings, settings$$);

        //Sync options within settings object, e.g. data mappings.
        mergedSettings = syncSettings(mergedSettings);

        //Sync control inputs with with settings object.
        let syncedControlInputs = syncControlInputs(controlInputs, mergedSettings);
        let controls = webcharts.createControls(element, { location: 'top', inputs: syncedControlInputs });

        //Create chart.
        let chart = webcharts.createChart(element, mergedSettings, controls);
        chart.on('init', onInit);
        chart.on('layout', onLayout);
        chart.on('preprocess', onPreprocess);
        chart.on('datatransform', onDataTransform);
        chart.on('draw', onDraw);
        chart.on('resize', onResize);

        return chart;
    }

    return safetyOutlierExplorer;
}(webCharts, d3);

