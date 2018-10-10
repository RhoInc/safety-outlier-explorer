(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('d3'), require('webcharts')) :
	typeof define === 'function' && define.amd ? define(['d3', 'webcharts'], factory) :
	(global.safetyOutlierExplorer = factory(global.d3,global.webCharts));
}(this, (function (d3$1,webcharts) { 'use strict';

if (typeof Object.assign != 'function') {
    Object.defineProperty(Object, 'assign', {
        value: function assign(target, varArgs) {
            // .length of function is 2
            'use strict';

            if (target == null) {
                // TypeError if undefined or null
                throw new TypeError('Cannot convert undefined or null to object');
            }

            var to = Object(target);

            for (var index = 1; index < arguments.length; index++) {
                var nextSource = arguments[index];

                if (nextSource != null) {
                    // Skip over if undefined or null
                    for (var nextKey in nextSource) {
                        // Avoid bugs when hasOwnProperty is shadowed
                        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                            to[nextKey] = nextSource[nextKey];
                        }
                    }
                }
            }

            return to;
        },
        writable: true,
        configurable: true
    });
}

if (!Array.prototype.find) {
    Object.defineProperty(Array.prototype, 'find', {
        value: function value(predicate) {
            // 1. Let O be ? ToObject(this value).
            if (this == null) {
                throw new TypeError('"this" is null or not defined');
            }

            var o = Object(this);

            // 2. Let len be ? ToLength(? Get(O, 'length')).
            var len = o.length >>> 0;

            // 3. If IsCallable(predicate) is false, throw a TypeError exception.
            if (typeof predicate !== 'function') {
                throw new TypeError('predicate must be a function');
            }

            // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
            var thisArg = arguments[1];

            // 5. Let k be 0.
            var k = 0;

            // 6. Repeat, while k < len
            while (k < len) {
                // a. Let Pk be ! ToString(k).
                // b. Let kValue be ? Get(O, Pk).
                // c. Let testResult be ToBoolean(? Call(predicate, T, � kValue, k, O �)).
                // d. If testResult is true, return kValue.
                var kValue = o[k];
                if (predicate.call(thisArg, kValue, k, o)) {
                    return kValue;
                }
                // e. Increase k by 1.
                k++;
            }

            // 7. Return undefined.
            return undefined;
        }
    });
}

if (!Array.prototype.findIndex) {
    Object.defineProperty(Array.prototype, 'findIndex', {
        value: function value(predicate) {
            // 1. Let O be ? ToObject(this value).
            if (this == null) {
                throw new TypeError('"this" is null or not defined');
            }

            var o = Object(this);

            // 2. Let len be ? ToLength(? Get(O, "length")).
            var len = o.length >>> 0;

            // 3. If IsCallable(predicate) is false, throw a TypeError exception.
            if (typeof predicate !== 'function') {
                throw new TypeError('predicate must be a function');
            }

            // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
            var thisArg = arguments[1];

            // 5. Let k be 0.
            var k = 0;

            // 6. Repeat, while k < len
            while (k < len) {
                // a. Let Pk be ! ToString(k).
                // b. Let kValue be ? Get(O, Pk).
                // c. Let testResult be ToBoolean(? Call(predicate, T, � kValue, k, O �)).
                // d. If testResult is true, return k.
                var kValue = o[k];
                if (predicate.call(thisArg, kValue, k, o)) {
                    return k;
                }
                // e. Increase k by 1.
                k++;
            }

            // 7. Return -1.
            return -1;
        }
    });
}

d3$1.selection.prototype.moveToFront = function () {
    return this.each(function () {
        this.parentNode.appendChild(this);
    });
};

d3$1.selection.prototype.moveToBack = function () {
    return this.each(function () {
        var firstChild = this.parentNode.firstChild;
        if (firstChild) {
            this.parentNode.insertBefore(this, firstChild);
        }
    });
};

var rendererSpecificSettings = {
    id_col: 'USUBJID',
    time_cols: [{
        type: 'ordinal',
        value_col: 'VISIT',
        label: 'Visit',
        order_col: 'VISITNUM',
        order: null,
        rotate_tick_labels: true,
        vertical_space: 100
    }, {
        type: 'linear',
        value_col: 'DY',
        label: 'Study Day',
        order_col: 'DY',
        order: null,
        rotate_tick_labels: false,
        vertical_space: 0
    }],
    measure_col: 'TEST',
    unit_col: 'STRESU',
    value_col: 'STRESN',
    normal_col_low: 'STNRLO',
    normal_col_high: 'STNRHI',
    start_value: null,
    filters: null,
    custom_marks: null,
    details: [{ value_col: 'AGE', label: 'Age' }, { value_col: 'SEX', label: 'Sex' }, { value_col: 'RACE', label: 'Race' }],
    tooltip_cols: null,
    multiples_sizing: {
        width: 300,
        height: 100
    },
    normal_range_method: 'LLN-ULN',
    normal_range_sd: 1.96,
    normal_range_quantile_low: 0.05,
    normal_range_quantile_high: 0.95,
    visits_without_data: false,
    unscheduled_visits: false,
    unscheduled_visit_pattern: '/unscheduled|early termination/i',
    unscheduled_visit_values: null, // takes precedence over unscheduled_visit_pattern
    line_attributes: {
        stroke: 'black',
        'stroke-width': 0.5,
        'stroke-opacity': 0.75
    },
    point_attributes: {
        stroke: '#1f78b4',
        'stroke-width': 0.5,
        'stroke-opacity': 1,
        radius: 10,
        fill: '#1f78b4',
        'fill-opacity': 0.2
    }
};

var webchartsSettings = {
    x: {
        column: null, //set in syncSettings()
        type: null, //set in syncSettings()
        behavior: 'raw'
    },
    y: {
        column: null, //set in syncSettings()
        stat: 'mean',
        type: 'linear',
        label: 'Value',
        behavior: 'raw',
        format: '0.2f'
    },
    marks: [{
        per: null, //set in syncSettings()
        type: 'line',
        attributes: {
            'clip-path': 'url(#1)'
        },
        tooltip: null //set in syncSettings()
    }, {
        per: null, //set in syncSettings()
        type: 'circle',
        attributes: {
            'clip-path': 'url(#1)'
        },
        tooltip: null //set in syncSettings()
    }],
    resizable: true,
    margin: { top: 5, bottom: 5, right: 20 }, //create space for box plot
    aspect: 3
};

var defaultSettings = Object.assign({}, rendererSpecificSettings, webchartsSettings);

// Replicate settings in multiple places in the settings object
function syncSettings(settings) {
    var time_col = settings.time_cols[0];

    //x-axis
    settings.x.column = time_col.value_col;
    settings.x.type = time_col.type;
    settings.x.label = time_col.label;
    settings.x.order = time_col.order;

    //y-axis
    settings.y.column = settings.value_col;

    //lines
    var lines = settings.marks.find(function (mark) {
        return mark.type === 'line';
    });
    lines.per = [settings.id_col, settings.measure_col];
    lines.tooltip = '[' + settings.id_col + ']';
    Object.assign(lines.attributes, settings.line_attributes);
    lines.attributes['stroke-width'] = settings.line_attributes['stroke-width'] || 0.5;

    //points
    var points = settings.marks.find(function (mark) {
        return mark.type === 'circle';
    });
    points.per = [settings.id_col, settings.measure_col, time_col.value_col, settings.value_col];
    points.tooltip = 'ID = [' + settings.id_col + ']\n[' + settings.measure_col + '] = [' + settings.value_col + '] [' + settings.unit_col + ']\n' + settings.x.column + ' = [' + settings.x.column + ']';
    //add custom tooltip values
    if (settings.tooltip_cols) {
        settings.tooltip_cols.forEach(function (tooltip) {
            var obj = typeof tooltip == 'string' ? { label: tooltip, value_col: tooltip } : tooltip;
            points.tooltip = points.tooltip + ('\n' + obj.label + ' = [' + obj.value_col + ']');
        });
    }

    Object.assign(points.attributes, settings.point_attributes);
    points.radius = settings.point_attributes.radius || 3;

    //Add custom marks to settings.marks.
    if (settings.custom_marks) settings.custom_marks.forEach(function (mark) {
        return settings.marks.push(mark);
    });

    //Define margins for box plot and rotated x-axis tick labels.
    if (settings.margin) settings.margin.bottom = time_col.vertical_space;else settings.margin = {
        right: 20,
        bottom: time_col.vertical_space
    };

    settings.rotate_x_tick_labels = time_col.rotate_tick_labels;

    //Convert unscheduled_visit_pattern from string to regular expression.
    if (typeof settings.unscheduled_visit_pattern === 'string' && settings.unscheduled_visit_pattern !== '') {
        var flags = settings.unscheduled_visit_pattern.replace(/.*?\/([gimy]*)$/, '$1'),
            pattern = settings.unscheduled_visit_pattern.replace(new RegExp('^/(.*?)/' + flags + '$'), '$1');
        settings.unscheduled_visit_regex = new RegExp(pattern, flags);
    }

    return settings;
}

// Default Control objects
var controlInputs = [{
    type: 'subsetter',
    value_col: 'measure_unit', // set in syncControlInputs()
    label: 'Measure',
    start: null
}, {
    type: 'dropdown',
    option: 'x.column',
    label: 'X-axis',
    require: true
}, {
    type: 'number',
    option: 'y.domain[0]',
    label: 'Lower',
    require: true
}, {
    type: 'number',
    option: 'y.domain[1]',
    label: 'Upper',
    require: true
}, {
    type: 'dropdown',
    option: 'normal_range_method',
    label: 'Method',
    values: ['None', 'LLN-ULN', 'Standard Deviation', 'Quantiles'],
    require: true
}, {
    type: 'number',
    option: 'normal_range_sd',
    label: '# Std. Dev.'
}, {
    type: 'number',
    label: 'Lower',
    option: 'normal_range_quantile_low'
}, {
    type: 'number',
    label: 'Upper',
    option: 'normal_range_quantile_high'
}, {
    type: 'checkbox',
    inline: true,
    option: 'visits_without_data',
    label: 'Without Data'
}, {
    type: 'checkbox',
    inline: true,
    option: 'unscheduled_visits',
    label: 'Unscheduled'
}];

// Map values from settings to control inputs
function syncControlInputs(controlInputs, settings) {
    var xAxisControl = controlInputs.find(function (d) {
        return d.label === 'X-axis';
    });
    xAxisControl.values = settings.time_cols.map(function (d) {
        return d.value_col;
    });

    if (settings.filters) {
        settings.filters.forEach(function (d, i) {
            var thisFilter = {
                type: 'subsetter',
                value_col: d.value_col ? d.value_col : d,
                label: d.label ? d.label : d.value_col ? d.value_col : d
            };
            //add the filter to the control inputs (as long as it isn't already there)
            var current_value_cols = controlInputs.filter(function (f) {
                return f.type == 'subsetter';
            }).map(function (m) {
                return m.value_col;
            });
            if (current_value_cols.indexOf(thisFilter.value_col) == -1) controlInputs.splice(4 + i, 0, thisFilter);
        });
    }

    //Remove unscheduled visit control if unscheduled visit pattern is unscpecified.
    if (!settings.unscheduled_visit_regex && !(Array.isArray(settings.unscheduled_visit_values) && settings.unscheduled_visit_values.length)) controlInputs.splice(controlInputs.map(function (controlInput) {
        return controlInput.label;
    }).indexOf('Unscheduled Visits'), 1);

    return controlInputs;
}

function countParticipants() {
    var _this = this;

    this.populationCount = d3$1.set(this.raw_data.map(function (d) {
        return d[_this.config.id_col];
    })).values().length;
}

function cleanData() {
    var _this = this;

    //Remove missing and non-numeric data.
    var preclean = this.raw_data;
    var clean = this.raw_data.filter(function (d) {
        return (/^-?[0-9.]+$/.test(d[_this.config.value_col])
        );
    });
    var nPreclean = preclean.length;
    var nClean = clean.length;
    var nRemoved = nPreclean - nClean;

    //Warn user of removed records.
    if (nRemoved > 0) console.warn(nRemoved + ' missing or non-numeric result' + (nRemoved > 1 ? 's have' : ' has') + ' been removed.');
    this.initial_data = clean;
    this.raw_data = clean;
}

function addVariables() {
    var _this = this;

    var ordinalTimeSettings = this.config.time_cols.find(function (time_col) {
        return time_col.type === 'ordinal';
    });

    this.raw_data.forEach(function (d) {
        //Append units to measure.
        d.measure_unit = d[_this.config.measure_col];
        if (_this.config.unit_col && d.hasOwnProperty(_this.config.unit_col) && d[_this.config.unit_col] !== '') d.measure_unit = d.measure_unit + ' (' + d[_this.config.unit_col] + ')';

        //Identify unscheduled visits.
        d.unscheduled = false;
        if (ordinalTimeSettings) {
            if (_this.config.unscheduled_visit_values) d.unscheduled = _this.config.unscheduled_visit_values.indexOf(d[ordinalTimeSettings.value_col]) > -1;else if (_this.config.unscheduled_visit_regex) d.unscheduled = _this.config.unscheduled_visit_regex.test(d[ordinalTimeSettings.value_col]);
        }
    });
}

function captureMeasures() {
    this.measures = d3$1.set(this.initial_data.map(function (d) {
        return d.measure_unit;
    })).values().sort();
}

function defineVisitOrder() {
    var _this = this;

    //ordinal
    this.config.time_cols.filter(function (time_col) {
        return time_col.type === 'ordinal';
    }).forEach(function (time_settings) {
        var visits = void 0,
            visitOrder = void 0;

        //Given an ordering variable sort a unique set of visits by the ordering variable.
        if (time_settings.order_col && _this.raw_data[0].hasOwnProperty(time_settings.order_col)) {
            //Define a unique set of visits with visit order concatenated.
            visits = d3$1.set(_this.raw_data.map(function (d) {
                return d[time_settings.order_col] + '|' + d[time_settings.value_col];
            })).values();

            //Sort visits.
            visitOrder = visits.sort(function (a, b) {
                var aOrder = a.split('|')[0],
                    bOrder = b.split('|')[0],
                    diff = +aOrder - +bOrder;
                return diff ? diff : d3$1.ascending(a, b);
            }).map(function (visit) {
                return visit.split('|')[1];
            });
        } else {
            //Otherwise sort a unique set of visits alphanumerically.
            //Define a unique set of visits.
            visits = d3$1.set(_this.raw_data.map(function (d) {
                return d[time_settings.value_col];
            })).values();

            //Sort visits;
            visitOrder = visits.sort();
        }

        //Set x-axis domain.
        if (time_settings.order) {
            //If a visit order is specified, use it and concatenate any unspecified visits at the end.
            time_settings.order = time_settings.order.concat(visitOrder.filter(function (visit) {
                return time_settings.order.indexOf(visit) < 0;
            }));
        } else
            //Otherwise use data-driven visit order.
            time_settings.order = visitOrder;

        //Define domain.
        time_settings.domain = time_settings.order;
    });
}

function updateControlInputs() {
    //If data do not have normal range variables update normal range method setting and options.
    if (Object.keys(this.raw_data[0]).indexOf(this.config.normal_col_low) < 0 || Object.keys(this.raw_data[0]).indexOf(this.config.normal_col_high) < 0) {
        if (this.config.normal_range_method === 'LLN-ULN') this.config.normal_range_method = 'Standard Deviation';
        this.controls.config.inputs.find(function (input) {
            return input.option === 'normal_range_method';
        }).values.splice(1, 1);
    }
}

function checkFilters() {
    var _this = this;

    this.controls.config.inputs = this.controls.config.inputs.filter(function (input) {
        if (input.type !== 'subsetter') {
            return true;
        } else if (!_this.raw_data[0].hasOwnProperty(input.value_col)) {
            console.warn('The [ ' + input.label + ' ] filter has been removed because the variable does not exist.');
        } else {
            var levels = d3$1.set(_this.raw_data.map(function (d) {
                return d[input.value_col];
            })).values();

            if (levels.length === 1) console.warn('The [ ' + input.label + ' ] filter has been removed because the variable has only one level.');

            return levels.length > 1;
        }
    });
}

function setInitialMeasure() {
    this.measure = {};
    this.controls.config.inputs.find(function (input) {
        return input.label === 'Measure';
    }).start = this.config.start_value || this.measures[0];
}

function addIDOrdering() {
    var _this = this;

    this.IDOrder = d3.set(this.raw_data.map(function (d) {
        return d[_this.config.id_col];
    })).values().sort().map(function (ID, i) {
        return {
            ID: ID,
            order: i
        };
    });
}

function onInit() {
    // 1. Count total participants prior to data cleaning.
    countParticipants.call(this);

    // 2. Drop missing values and remove measures with any non-numeric results.
    cleanData.call(this);

    // 3a Define additional variables.
    addVariables.call(this);

    // 3b Capture unique set of measures.
    captureMeasures.call(this);

    // 3c Define ordered x-axis domain with visit order variable.
    defineVisitOrder.call(this);

    // 3d Remove invalid control inputs.
    updateControlInputs.call(this);

    // 3e Remove filters for nonexistent or single-level variables.
    checkFilters.call(this);

    // 3f Choose the start value for the Test filter
    setInitialMeasure.call(this);

    // 3g Capture unique set of IDs and apply an ordering.
    addIDOrdering.call(this);
}

function identifyControls() {
    var controlGroups = this.controls.wrap.selectAll('.control-group');

    //Give each control a unique ID.
    controlGroups.attr('id', function (d) {
        return d.label.toLowerCase().replace(' ', '-');
    }).each(function (d) {
        d3$1.select(this).classed(d.type, true);
    });

    //Give y-axis controls a common class name.
    controlGroups.filter(function (d) {
        return ['y.domain[0]', 'y.domain[1]'].indexOf(d.option) > -1;
    }).classed('y-axis', true);

    //Give normal range controls a common class name.
    controlGroups.filter(function (d) {
        return ['normal_range_method', 'normal_range_sd', 'normal_range_quantile_low', 'normal_range_quantile_high'].indexOf(d.option) > -1;
    }).classed('normal-range', true);

    //Give visit range controls a common class name.
    controlGroups.filter(function (d) {
        return ['visits_without_data', 'unscheduled_visits'].indexOf(d.option) > -1;
    }).classed('visits', true);
}

function labelXaxisOptions() {
    var _this = this;

    this.controls.wrap.selectAll('.control-group').filter(function (d) {
        return d.option === 'x.column';
    }).selectAll('option').property('label', function (d) {
        return _this.config.time_cols.find(function (time_col) {
            return time_col.value_col === d;
        }).label;
    });
}

function addYdomainResetButton() {
    var _this = this;

    var resetContainer = this.controls.wrap.insert('div', '#lower').classed('control-group y-axis', true).datum({
        type: 'button',
        option: 'y.domain',
        label: ''
    }).style('vertical-align', 'bottom');
    var resetLabel = resetContainer.append('span').attr('class', 'wc-control-label').text('Limits');
    var resetButton = resetContainer.append('button').text(' Reset ').style('padding', '0px 5px').on('click', function () {
        _this.config.y.domain = _this.measure.domain; //reset axis to full range

        _this.controls.wrap.selectAll('.control-group').filter(function (f) {
            return f.option === 'y.domain[0]';
        }).select('input').property('value', _this.config.y.domain[0]);

        _this.controls.wrap.selectAll('.control-group').filter(function (f) {
            return f.option === 'y.domain[1]';
        }).select('input').property('value', _this.config.y.domain[1]);

        _this.draw();
    });
}

function insertGrouping(selector, label) {
    var grouping = this.controls.wrap.insert('div', selector).style({
        display: 'inline-block',
        'margin-right': '5px'
    }).append('fieldset').style('padding', '0px 2px');
    grouping.append('legend').text(label);
    this.controls.wrap.selectAll(selector).each(function (d) {
        this.style.marginTop = '0px';
        this.style.marginRight = '2px';
        this.style.marginBottom = '2px';
        this.style.marginLeft = '2px';
        grouping.node().appendChild(this);
    });
}

function groupControls() {
    //Group y-axis controls.
    insertGrouping.call(this, '.y-axis', 'Y-axis');

    //Group filters.
    if (this.filters.length > 1) insertGrouping.call(this, '.subsetter:not(#measure)', 'Filters');

    //Group normal controls.
    insertGrouping.call(this, '.normal-range', 'Normal Range');

    //Group visit controls.
    insertGrouping.call(this, '.visits', 'Visits');
}

function hideNormalRangeInputs() {
    var _this = this;

    var controls = this.controls.wrap.selectAll('.control-group');

    //Normal range method control
    var normalRangeMethodControl = controls.filter(function (d) {
        return d.label === 'Method';
    });

    //Normal range inputs
    var normalRangeInputs = controls.filter(function (d) {
        return ['normal_range_sd', 'normal_range_quantile_low', 'normal_range_quantile_high'].indexOf(d.option) > -1;
    }).style('display', function (d) {
        return _this.config.normal_range_method !== 'Standard Deviation' && d.option === 'normal_range_sd' || _this.config.normal_range_method !== 'Quantiles' && ['normal_range_quantile_low', 'normal_range_quantile_high'].indexOf(d.option) > -1 ? 'none' : 'inline-table';
    });

    //Set significant digits to .01.
    normalRangeInputs.select('input').attr('step', 0.01);

    normalRangeMethodControl.on('change', function () {
        var normal_range_method = d3$1.select(this).select('option:checked').text();

        normalRangeInputs.style('display', function (d) {
            return normal_range_method !== 'Standard Deviation' && d.option === 'normal_range_sd' || normal_range_method !== 'Quantiles' && ['normal_range_quantile_low', 'normal_range_quantile_high'].indexOf(d.option) > -1 ? 'none' : 'inline-table';
        });
    });
}

function addParticipantCountContainer() {
    this.controls.wrap.append('div').attr('id', 'participant-count').style('font-style', 'italic');
}

function addSmallMultiplesContainer() {
    this.wrap.append('div').attr('class', 'multiples');
}

function onLayout() {
    // Distinguish controls to insert y-axis reset button in the correct position.
    identifyControls.call(this);

    //Label x-axis options.
    labelXaxisOptions.call(this);

    //Add a button to reset the y-domain
    addYdomainResetButton.call(this);

    //Group related controls visually.
    groupControls.call(this);

    //Hide normal range input controls depending on the normal range method.
    hideNormalRangeInputs.call(this);

    //Add participant count container.
    addParticipantCountContainer.call(this);

    //Add container for small multiples.
    addSmallMultiplesContainer.call(this);
}

function getCurrentMeasure() {
    this.measure.previous = this.measure.current;
    this.measure.current = this.controls.wrap.selectAll('.control-group').filter(function (d) {
        return d.value_col && d.value_col === 'measure_unit';
    }).select('option:checked').text();
}

function defineMeasureData() {
    var _this = this;

    this.measure.data = this.initial_data.filter(function (d) {
        return d.measure_unit === _this.measure.current;
    });
    this.measure.unit = this.config.unit_col && this.measure.data[0].hasOwnProperty(this.config.unit_col) ? this.measure.data[0][this.config.unit_col] : null;
    this.measure.results = this.measure.data.map(function (d) {
        return +d[_this.config.value_col];
    }).sort(function (a, b) {
        return a - b;
    });
    this.measure.domain = d3$1.extent(this.measure.results);
    this.measure.range = this.measure.domain[1] - this.measure.domain[0];
    this.raw_data = this.measure.data.filter(function (d) {
        return _this.config.unscheduled_visits || !d.unscheduled;
    });
}

function removeVisitsWithoutData() {
    var _this = this;

    if (!this.config.visits_without_data) this.config.x.domain = this.config.x.domain.filter(function (visit) {
        return d3$1.set(_this.raw_data.map(function (d) {
            return d[_this.config.time_settings.value_col];
        })).values().indexOf(visit) > -1;
    });
}

function removeUnscheduledVisits() {
    var _this = this;

    if (!this.config.unscheduled_visits) {
        if (this.config.unscheduled_visit_values) this.config.x.domain = this.config.x.domain.filter(function (visit) {
            return _this.config.unscheduled_visit_values.indexOf(visit) < 0;
        });else if (this.config.unscheduled_visit_regex) this.config.x.domain = this.config.x.domain.filter(function (visit) {
            return !_this.config.unscheduled_visit_regex.test(visit);
        });
    }
}

function setXdomain() {
    var _this = this;

    //Attach the time settings object to the x-axis settings object.
    this.config.time_settings = this.config.time_cols.find(function (time_col) {
        return time_col.value_col === _this.config.x.column;
    });
    Object.assign(this.config.x, this.config.time_settings);

    //When the domain is not specified, it's calculated on data transform.
    if (this.config.x.type === 'linear') {
        delete this.config.x.domain;
        delete this.config.x.order;
    }

    //Remove unscheduled visits from x-domain if x-type is ordinal.
    if (this.config.x.type === 'ordinal') {
        removeVisitsWithoutData.call(this);
        removeUnscheduledVisits.call(this);
    }
}

function setYdomain() {
    //Define y-domain.
    if (this.measure.current !== this.measure.previous) this.config.y.domain = this.measure.domain;else if (this.config.y.domain[0] > this.config.y.domain[1])
        // new measure
        this.config.y.domain.reverse();else if (this.config.y.domain[0] === this.config.y.domain[1])
        // invalid domain
        this.config.y.domain = this.config.y.domain.map(function (d, i) {
            return i === 0 ? d - d * 0.01 : d + d * 0.01;
        }); // domain with zero range
}

function updateYaxisLimitControls() {
    //Update y-axis limit controls.
    this.controls.wrap.selectAll('.control-group').filter(function (f) {
        return f.option === 'y.domain[0]';
    }).select('input').property('value', this.config.y.domain[0]).style('box-shadow', 'none');

    this.controls.wrap.selectAll('.control-group').filter(function (f) {
        return f.option === 'y.domain[1]';
    }).select('input').property('value', this.config.y.domain[1]).style('box-shadow', 'none');
}

function setYaxisLabel() {
    this.config.y.label = this.measure.current;
}

function updateYaxisResetButton() {
    //Update tooltip of y-axis domain reset button.
    if (this.currentMeasure !== this.previousMeasure) this.controls.wrap.selectAll('.y-axis').property('title', 'Initial Limits: [' + this.config.y.domain[0] + ' - ' + this.config.y.domain[1] + ']');
}

function deriveStatistics() {
    var _this = this;

    if (this.config.normal_range_method === 'LLN-ULN') {
        this.lln = function (d) {
            return d instanceof Object ? +d[_this.config.normal_col_low] : d3$1.median(_this.measure.data, function (d) {
                return +d[_this.config.normal_col_low];
            });
        };
        this.uln = function (d) {
            return d instanceof Object ? +d[_this.config.normal_col_high] : d3$1.median(_this.measure.data, function (d) {
                return +d[_this.config.normal_col_high];
            });
        };
    } else if (this.config.normal_range_method === 'Standard Deviation') {
        this.mean = d3$1.mean(this.measure.results);
        this.sd = d3$1.deviation(this.measure.results);
        this.lln = function () {
            return _this.mean - _this.config.normal_range_sd * _this.sd;
        };
        this.uln = function () {
            return _this.mean + _this.config.normal_range_sd * _this.sd;
        };
    } else if (this.config.normal_range_method === 'Quantiles') {
        this.lln = function () {
            return d3$1.quantile(_this.measure.results, _this.config.normal_range_quantile_low);
        };
        this.uln = function () {
            return d3$1.quantile(_this.measure.results, _this.config.normal_range_quantile_high);
        };
    } else {
        this.lln = function (d) {
            return d instanceof Object ? d[_this.config.value_col] + 1 : _this.measure.results[0];
        };
        this.uln = function (d) {
            return d instanceof Object ? d[_this.config.value_col] - 1 : _this.measure.results[_this.measure.results.length - 1];
        };
    }
}

function onPreprocess() {
    // 1. Capture currently selected measure.
    getCurrentMeasure.call(this);

    // 2. Filter data on currently selected measure.
    defineMeasureData.call(this);

    // 3a Set x-domain given current visit settings.
    setXdomain.call(this);

    // 3b Set y-domain given currently selected measure.
    setYdomain.call(this);

    // 3c Set y-axis label to current measure.
    setYaxisLabel.call(this);

    // 4a Update y-axis reset button when measure changes.
    updateYaxisResetButton.call(this);

    // 4b Update y-axis limit controls to match y-axis domain.
    updateYaxisLimitControls.call(this);

    // 4c Define normal range statistics.
    deriveStatistics.call(this);
}

function onDatatransform() {}

// Takes a webcharts object creates a text annotation giving the
// number and percentage of observations shown in the current view
//
// inputs:
// - chart - a webcharts chart object
// - selector - css selector for the annotation
// - id_unit - a text string to label the units in the annotation (default = "participants")
function updateParticipantCount(chart, selector, id_unit) {
    //count the number of unique ids in the current chart and calculate the percentage
    var currentObs = d3$1.set(chart.filtered_data.map(function (d) {
        return d[chart.config.id_col];
    })).values().length;
    var percentage = d3$1.format('0.1%')(currentObs / chart.populationCount);

    //clear the annotation
    var annotation = d3$1.select(selector);
    d3$1.select(selector).selectAll('*').remove();

    //update the annotation
    var units = id_unit ? ' ' + id_unit : ' participant(s)';
    annotation.text('\n' + currentObs + ' of ' + chart.populationCount + units + ' shown (' + percentage + ')');
}

function resetChart() {
    delete this.hovered_id;
    delete this.selected_id;
    this.wrap.select('.multiples').select('.wc-small-multiples').remove();
}

function updateBottomMargin() {
    this.config.margin.bottom = this.config.x.vertical_space;
}

function onDraw() {
    //Annotate participant count.
    updateParticipantCount(this, '#participant-count');

    //Clear current multiples.
    resetChart.call(this);

    //Update bottom margin for tick label rotation.
    updateBottomMargin.call(this);
}

function highlight() {
    var _this = this;

    //Highlight line and move in front of all other lines.
    var lines = this.svg.selectAll('.line').sort(function (a, b) {
        return a.key.indexOf(_this.selected_id) === 0 ? 2 : b.key.indexOf(_this.selected_id) === 0 ? -2 : a.key.indexOf(_this.hovered_id) === 0 ? 1 : b.key.indexOf(_this.hovered_id) === 0 ? -1 : 0;
    });

    lines.filter(function (d) {
        return d.values[0].values.raw[0][_this.config.id_col] == _this.hovered_id;
    }).select('path').attr('stroke-width', this.config.marks.find(function (mark) {
        return mark.type === 'line';
    }).attributes['stroke-width'] * 4);

    lines.filter(function (d) {
        return d.values[0].values.raw[0][_this.config.id_col] == _this.selected_id;
    }).select('path').attr('stroke-width', this.config.marks.find(function (mark) {
        return mark.type === 'line';
    }).attributes['stroke-width'] * 8);

    //Highlight points and move behind all other points.
    this.svg.selectAll('.point').sort(function (a, b) {
        var aComp = a.key.indexOf(_this.selected_id) === 0; // sort clicked ID last
        var bComp = b.key.indexOf(_this.selected_id) === 0; // sort clicked ID last
        var orderDiff = b.order - a.order; // otherwise sort in reverse order
        var comp = aComp ? -1 : bComp ? 1 : orderDiff;

        return comp;
    }).each(function (d, i) {
        d.order = d.key.indexOf(_this.selected_id) ? -1 : i;
    }).filter(function (d) {
        return [_this.hovered_id, _this.selected_id].indexOf(d.values.raw[0][_this.config.id_col]) > -1;
    }).select('circle').attr('r', this.config.marks.find(function (mark) {
        return mark.type === 'circle';
    }).radius * 1.5).attr('stroke', 'black').attr('stroke-width', 3);
}

function maintainHighlight() {
    if (this.selected_id) highlight.call(this);
}

function drawNormalRange() {
    this.wrap.select('.normal-range').remove();
    if (this.config.normal_range_method) {
        var normalRange = this.svg.insert('g', '.line-supergroup').classed('normal-range', true);
        normalRange.append('rect').attr({
            x: 0,
            y: this.y(this.uln()),
            width: this.plot_width,
            height: this.y(this.lln()) - this.y(this.uln()),
            'clip-path': 'url(#' + this.id + ')'
        }).style({
            fill: 'blue',
            'fill-opacity': 0.1
        });
        normalRange.append('title').text('Normal range: ' + this.lln() + '-' + this.uln());
    }
}

function orderPoints() {
    this.marks.find(function (mark) {
        return mark.type === 'circle';
    }).groups.each(function (d, i) {
        return d.order = i;
    });
}

function clearHighlight() {
    this.svg.selectAll('.line:not(.selected)').select('path').attr(this.config.line_attributes);
    this.svg.selectAll('.point:not(.selected)').select('circle').attr(this.config.point_attributes).attr('r', this.config.marks.find(function (mark) {
        return mark.type === 'circle';
    }).radius);
}

function addOverlayEventListener() {
    var _this = this;

    var context = this;

    this.svg.select('.overlay').on('mouseover', function () {
        delete context.hovered_id;
        clearHighlight.call(context);
    }).on('click', function () {
        //clear current multiples
        _this.wrap.select('.multiples').select('.wc-small-multiples').remove();
        _this.svg.selectAll('.line').classed('selected', false);
        _this.svg.selectAll('.point').classed('selected', false);
        delete _this.hovered_id;
        delete _this.selected_id;
        clearHighlight.call(_this);
    });
}

function clearSelected() {
    this.svg.selectAll('.line').classed('selected', false);
    this.svg.selectAll('.point').classed('selected', false);
}

function applySelected() {
    var _this = this;

    this.svg.selectAll('.line').filter(function (d) {
        return d.values[0].values.raw[0][_this.config.id_col] === _this.selected_id;
    }).classed('selected', true);
    this.svg.selectAll('.point').filter(function (d) {
        return d.values.raw[0][_this.config.id_col] === _this.selected_id;
    }).classed('selected', true);
}

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};





var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();

/*------------------------------------------------------------------------------------------------\
  Clone a variable (http://stackoverflow.com/a/728694).
\------------------------------------------------------------------------------------------------*/

function clone(obj) {
    var copy;

    //Handle the 3 simple types, and null or undefined
    if (null == obj || 'object' != (typeof obj === "undefined" ? "undefined" : _typeof(obj))) return obj;

    //Handle Date
    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    //Handle Array
    if (obj instanceof Array) {
        copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }

    //Handle Object
    if (obj instanceof Object) {
        copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
}

function defineSmallMultiples() {
    //Define small multiples settings.
    var multiples_settings = Object.assign({}, clone(this.config), clone(Object.getPrototypeOf(this.config)));
    multiples_settings.x.domain = null;
    multiples_settings.y.domain = null;
    multiples_settings.resizable = false;
    multiples_settings.scale_text = false;

    if (multiples_settings.multiples_sizing.width) multiples_settings.width = multiples_settings.multiples_sizing.width;
    if (multiples_settings.multiples_sizing.height) multiples_settings.height = multiples_settings.multiples_sizing.height + (multiples_settings.margin.bottom ? multiples_settings.margin.bottom : 0);

    multiples_settings.margin = { bottom: multiples_settings.margin.bottom || 20 };

    //Add participant dropdown.
    multiples_settings.selected_id = this.selected_id;
    var participantDropdown = webcharts.createControls(this.wrap.select('.multiples').node(), {
        inputs: [{
            type: 'dropdown',
            option: 'selected_id',
            values: this.IDOrder.map(function (d) {
                return d.ID;
            }),
            require: true
        }]
    });

    //Initialize small multiples.
    this.multiples = webcharts.createChart(this.wrap.select('.multiples').node(), multiples_settings, participantDropdown);
}

function insertHeader() {
    this.multiples.wrap.insert('strong', '.legend').text('All Measures for ' + this.selected_id);
}

function participantCharacteristics() {
    var detail_table = this.multiples.wrap.insert('table', '.legend').append('tbody').classed('detail-listing', true);
    detail_table.append('thead').selectAll('th').data(['', '']).enter().append('th');
    detail_table.append('tbody');

    //Insert a line for each item in [ settings.detail_cols ].
    if (Array.isArray(this.config.details) && this.config.details.length) {
        var id = this.participantData[0];
        this.config.details.forEach(function (detail) {
            var value_col = detail.value_col ? detail.value_col : detail;
            var label = detail.label ? detail.label : detail.value_col ? detail.value_col : detail;

            if (id[value_col] !== undefined) detail_table.select('tbody').append('tr').selectAll('td').data([label, id[value_col]]).enter().append('td').style('text-align', function (d, i) {
                return i === 0 ? 'right' : 'left';
            }).text(function (d, i) {
                return i === 0 ? d + ':' : d;
            });
        });
    }
}

function onLayout$1() {
    this.multiples.on('layout', function () {
        //Define multiple styling.
        this.wrap.style('display', 'block');
        this.wrap.selectAll('.wc-chart-title').style('display', 'block').style('border-top', '1px solid #eee');
        this.wrap.selectAll('.wc-chart').style('padding-bottom', '2px');

        //Set y-label to measure unit.
        this.config.y.label = '';
    });
}

function onPreprocess$1() {
    this.multiples.on('preprocess', function () {
        var _this = this;

        //Define y-domain as minimum of lower limit of normal and minimum result and maximum of
        //upper limit of normal and maximum result.
        var filtered_data = this.raw_data.filter(function (f) {
            return f[_this.filters[0].col] === _this.filters[0].val;
        });

        //Calculate range of normal range.
        var normlo = Math.min.apply(null, filtered_data.map(function (m) {
            return +m[_this.config.normal_col_low];
        }).filter(function (f) {
            return +f || +f === 0;
        }));
        var normhi = Math.max.apply(null, filtered_data.map(function (m) {
            return +m[_this.config.normal_col_high];
        }).filter(function (f) {
            return +f || +f === 0;
        }));

        //Calculate range of data.
        var ylo = d3$1.min(filtered_data.map(function (m) {
            return +m[_this.config.y.column];
        }).filter(function (f) {
            return +f || +f === 0;
        }));
        var yhi = d3$1.max(filtered_data.map(function (m) {
            return +m[_this.config.y.column];
        }).filter(function (f) {
            return +f || +f === 0;
        }));

        //Set y-domain.
        this.config.y_dom = [Math.min(normlo, ylo), Math.max(normhi, yhi)];
    });
}

function adjustTicks() {
    if (this.config.x.rotate_tick_labels) this.svg.selectAll('.x.axis .tick text').attr({
        transform: 'rotate(-45)',
        dx: -10,
        dy: 10
    }).style('text-anchor', 'end');
}

function rangePolygon() {
    var _this = this;

    var area = d3$1.svg.area().x(function (d) {
        return _this.x(d['TIME']) + (_this.config.x.type === 'ordinal' ? _this.x.rangeBand() / 2 : 0);
    }).y0(function (d) {
        return (/^-?[0-9.]+$/.test(d[_this.config.normal_col_low]) ? _this.y(d[_this.config.normal_col_low]) : 0
        );
    }).y1(function (d) {
        return (/^-?[0-9.]+$/.test(d[_this.config.normal_col_high]) ? _this.y(d[_this.config.normal_col_high]) : 0
        );
    });

    var dRow = this.filtered_data[0];

    var myRows = this.x_dom.slice().map(function (m) {
        return {
            STNRLO: dRow[_this.config.normal_col_low],
            STNRHI: dRow[_this.config.normal_col_high],
            TIME: m
        };
    });

    //remove what is there now
    this.svg.select('.norms').remove();

    //add new
    var normalRange = this.svg.append('g').datum(myRows).attr('class', 'norms');
    normalRange.append('path').attr('fill', 'blue').attr('fill-opacity', 0.1).attr('d', area);
    normalRange.append('title').text(function (d) {
        return 'Normal range: ' + d[0].STNRLO + '-' + d[0].STNRHI;
    });
}

function onResize$1() {
        this.multiples.on('resize', function () {
                //Resize text manually.
                this.wrap.select('.wc-chart-title').style('font-size', '12px');
                this.svg.selectAll('.axis .tick text').style('font-size', '10px');

                //Draw normal range.
                if (this.filtered_data.length) rangePolygon.call(this);

                //Axis tweaks
                this.svg.select('.x.axis').select('.axis-title').remove();

                //Delete legend.
                this.legend.remove();

                //Rotate ticks.
                adjustTicks.call(this);
        });
}

function smallMultiples() {
    var _this = this;

    var context = this; // chart

    //Clear current multiples.
    this.wrap.select('.multiples').select('.wc-small-multiples').remove();

    //Define participant data.
    this.participantData = this.initial_data.filter(function (d) {
        return d[_this.config.id_col] === _this.selected_id;
    });

    //Define small multiples.
    defineSmallMultiples.call(this);

    //Insert header.
    insertHeader.call(this);

    //Insert participant characteristics table.
    participantCharacteristics.call(this);

    //Add callbacks to small multiples.
    onLayout$1.call(this);
    onPreprocess$1.call(this);
    onResize$1.call(this);

    //Initialize small multiples.
    webcharts.multiply(this.multiples, this.participantData, 'measure_unit', this.measures);
    this.multiples.controls.wrap.selectAll('.control-group select').on('change', function (d) {
        context.wrap.select('.multiples').selectAll('.wc-controls').remove();
        context.wrap.select('.multiples').selectAll('.wc-small-multiples').remove();
        delete context.hovered_id;
        context.selected_id = d3.select(this).selectAll('option:checked').text();
        clearSelected.call(context);
        applySelected.call(context);
        highlight.call(context);
        smallMultiples.call(context);
    });
}

function addLineEventListeners() {
    var lines = this.svg.selectAll('.line');
    var points = this.svg.selectAll('.point');

    //lines
    //    .on('mouseover', function(d) {
    //        delete context.hovered_id;
    //        clearHighlight.call(context);
    //        context.hovered_id = d.values[0].values.raw[0][context.config.id_col];
    //        highlight.call(context);
    //    })
    //    .on('mouseout', function(d) {
    //        delete context.hovered_id;
    //        clearHighlight.call(context);
    //    })
    //    .on('click', d => {
    //        delete context.hovered_id;
    //        this.selected_id = d.values[0].values.raw[0][this.config.id_col];
    //        clearSelected.call(this);
    //        applySelected.call(this);
    //        highlight.call(this);
    //        smallMultiples.call(this);
    //    });
}

function addPointEventListeners() {
    var _this = this;

    var context = this;
    var lines = this.svg.selectAll('.line');
    var points = this.svg.selectAll('.point');

    points
    //.on('mouseover', function(d) {
    //    delete context.hovered_id;
    //    clearHighlight.call(context);
    //    context.hovered_id = d.values.raw[0][context.config.id_col];
    //    highlight.call(context);
    //})
    //.on('mouseout', function(d) {
    //    delete context.hovered_id;
    //    clearHighlight.call(context);
    //})
    .on('click', function (d) {
        delete context.hovered_id;
        _this.selected_id = d.values.raw[0][_this.config.id_col];
        clearSelected.call(_this);
        applySelected.call(_this);
        highlight.call(_this);
        smallMultiples.call(_this);
    });
}

function addEventListeners() {
    addOverlayEventListener.call(this);
    addLineEventListeners.call(this);
    addPointEventListeners.call(this);
}

function addBoxPlot() {
    //Clear box plot.
    this.svg.select('g.boxplot').remove();

    //Customize box plot.
    var results = this.current_data.map(function (d) {
        return +d.values.y;
    }).sort(d3$1.ascending);
    var height = this.plot_height;
    var width = 1;
    var domain = this.y_dom;
    var boxPlotWidth = 10;
    var boxColor = '#bbb';
    var boxInsideColor = 'white';
    var fmt = d3$1.format('.2f');
    var horizontal = true;

    //set up scales
    var x = d3$1.scale.linear().range([0, width]);
    var y = d3$1.scale.linear().range([height, 0]);

    if (horizontal) {
        y.domain(domain);
    } else {
        x.domain(domain);
    }

    var probs = [0.05, 0.25, 0.5, 0.75, 0.95];
    for (var i = 0; i < probs.length; i++) {
        probs[i] = d3$1.quantile(results, probs[i]);
    }

    var boxplot = this.svg.append('g').attr('class', 'boxplot').datum({
        values: results,
        probs: probs
    }).attr('transform', 'translate(' + (this.plot_width + this.config.margin.right / 2) + ',0)');

    //set bar width variable
    var box_x = horizontal ? x(0.5 - boxPlotWidth / 2) : x(probs[1]);
    var box_width = horizontal ? x(0.5 + boxPlotWidth / 2) - x(0.5 - boxPlotWidth / 2) : x(probs[3]) - x(probs[1]);
    var box_y = horizontal ? y(probs[3]) : y(0.5 + boxPlotWidth / 2);
    var box_height = horizontal ? -y(probs[3]) + y(probs[1]) : y(0.5 - boxPlotWidth / 2) - y(0.5 + boxPlotWidth / 2);

    boxplot.append('rect').attr('class', 'boxplot fill').attr('x', box_x).attr('width', box_width).attr('y', box_y).attr('height', box_height).style('fill', boxColor);

    //draw dividing lines at median, 95% and 5%
    var iS = [0, 2, 4];
    var iSclass = ['', 'median', ''];
    var iSColor = [boxColor, boxInsideColor, boxColor];
    for (var i = 0; i < iS.length; i++) {
        boxplot.append('line').attr('class', 'boxplot ' + iSclass[i]).attr('x1', horizontal ? x(0.5 - boxPlotWidth / 2) : x(probs[iS[i]])).attr('x2', horizontal ? x(0.5 + boxPlotWidth / 2) : x(probs[iS[i]])).attr('y1', horizontal ? y(probs[iS[i]]) : y(0.5 - boxPlotWidth / 2)).attr('y2', horizontal ? y(probs[iS[i]]) : y(0.5 + boxPlotWidth / 2)).style('fill', iSColor[i]).style('stroke', iSColor[i]);
    }

    //draw lines from 5% to 25% and from 75% to 95%
    var iS = [[0, 1], [3, 4]];
    for (var i = 0; i < iS.length; i++) {
        boxplot.append('line').attr('class', 'boxplot').attr('x1', horizontal ? x(0.5) : x(probs[iS[i][0]])).attr('x2', horizontal ? x(0.5) : x(probs[iS[i][1]])).attr('y1', horizontal ? y(probs[iS[i][0]]) : y(0.5)).attr('y2', horizontal ? y(probs[iS[i][1]]) : y(0.5)).style('stroke', boxColor);
    }

    boxplot.append('circle').attr('class', 'boxplot mean').attr('cx', horizontal ? x(0.5) : x(d3$1.mean(results))).attr('cy', horizontal ? y(d3$1.mean(results)) : y(0.5)).attr('r', horizontal ? x(boxPlotWidth / 3) : y(1 - boxPlotWidth / 3)).style('fill', boxInsideColor).style('stroke', boxColor);

    boxplot.append('circle').attr('class', 'boxplot mean').attr('cx', horizontal ? x(0.5) : x(d3$1.mean(results))).attr('cy', horizontal ? y(d3$1.mean(results)) : y(0.5)).attr('r', horizontal ? x(boxPlotWidth / 6) : y(1 - boxPlotWidth / 6)).style('fill', boxColor).style('stroke', 'None');

    boxplot.selectAll('.boxplot').append('title').text(function (d) {
        return 'N = ' + d.values.length + '\n' + 'Min = ' + d3$1.min(d.values) + '\n' + '5th % = ' + fmt(d3$1.quantile(d.values, 0.05)) + '\n' + 'Q1 = ' + fmt(d3$1.quantile(d.values, 0.25)) + '\n' + 'Median = ' + fmt(d3$1.median(d.values)) + '\n' + 'Q3 = ' + fmt(d3$1.quantile(d.values, 0.75)) + '\n' + '95th % = ' + fmt(d3$1.quantile(d.values, 0.95)) + '\n' + 'Max = ' + d3$1.max(d.values) + '\n' + 'Mean = ' + fmt(d3$1.mean(d.values)) + '\n' + 'StDev = ' + fmt(d3$1.deviation(d.values));
    });
}

function onResize() {
    //Maintain mark highlighting.
    maintainHighlight.call(this);

    //Draw normal range.
    drawNormalRange.call(this);

    //Add initial ordering to points; ordering will update as points are clicked.
    orderPoints.call(this);

    //Add event listeners to lines, points, and overlay.
    addEventListeners.call(this);

    //Draw a marginal box plot.
    addBoxPlot.call(this);

    //Rotate tick marks to prevent text overlap.
    adjustTicks.call(this);
}

//polyfills
function safetyOutlierExplorer(element, settings) {
    //Merge user settings with default settings.
    var mergedSettings = Object.assign({}, defaultSettings, settings);

    //Sync options within settings object, e.g. data mappings.
    mergedSettings = syncSettings(mergedSettings);

    //Sync control inputs with with settings object.
    var syncedControlInputs = syncControlInputs(controlInputs, mergedSettings);
    var controls = webcharts.createControls(element, { location: 'top', inputs: syncedControlInputs });

    //Create chart.
    var chart = webcharts.createChart(element, mergedSettings, controls);
    chart.on('init', onInit);
    chart.on('layout', onLayout);
    chart.on('preprocess', onPreprocess);
    chart.on('datatransform', onDatatransform);
    chart.on('draw', onDraw);
    chart.on('resize', onResize);

    return chart;
}

return safetyOutlierExplorer;

})));
