# Saftey Outlier Explorer

![alt tag](https://user-images.githubusercontent.com/31038805/32173925-d40b050a-bd56-11e7-8750-1bc631296376.gif)


## Overview 
Safety Outlier Explorer is a JavaScript library built using Webcharts ([1](https://github.com/RhoInc/Webcharts), [2](https://github.com/RhoInc/webcharts-wrapper-boilerplate)) that allows users to view clinical outcomes such as lab results and vital signs over time and to identify values that fall outside of expected ranges. Clicking on a point or line generates a participant-level plot for each measure in the data:

![Example](https://github.com/RhoInc/safety-outlier-explorer/wiki/img/all-measures.PNG)

Users can view any outcome in the data and specify a linear (study day) or ordinal (study visit) x-axis; the full functionality is described [here](https://github.com/RhoInc/safety-outlier-explorer/wiki/User-Requirements).
The library expects an [ADaM-esque data structure](https://www.cdisc.org/system/files/members/standard/foundational/adam/analysis_data_model_v2.1.pdf) by default but can be customized to use any dataset that is one row per participant per timepoint per measure.
Full details about chart configuration are [here](Configuration).



## Usage

The code to initialize the chart looks like this: 

```javascript

    d3.csv('ADBDS.csv', function(data) {
        safetyOutlierExplorer('body', {}).init(data);
    });

```

The chart can be configured to facilitate non-standard data formats and to alter the chart itself. Overwrite the defaults with a custom settings object like so:

```javascript

    let settings = {
        time_cols: [
            {
                value_col: 'AVISIT',
                type: 'ordinal',
                label: 'Visit',
                rotate_tick_labels: true,
                vertical_space: 100},
            {
                value_col: 'ADY',
                type: 'linear',
                label: 'Study Day',
                rotate_tick_labels: false,
                vertical_space: 0}],
        measure_col: 'PARAM',
        value_col: 'AVAL',
        normal_col_low: 'ANRLO',
        normal_col_high: 'ANRHI',
        filters: [
            {value_col: 'TRT01P', label: 'Treatment Group'},
            {value_col: 'SEX', label: 'Sex'},
            {value_col: 'RACE', label: 'Race'}],
        details: [
            {value_col: 'AGE', label: 'Age'}],
        multiples_sizing: {
            width: 250,
            height: 75}
        };

    d3.csv('ADBDS.csv', function(data) {
        safetyOutlierExplorer('body', settings).init(data);
    });

```

## Links 

- [Interactive Example](https://rhoinc.github.io/viz-library/examples/0008-safetyExplorer-default/safety-outlier-explorer/)
- [Configuration](https://github.com/RhoInc/safety-outlier-explorer/wiki/Configuration) 
- [API](https://github.com/RhoInc/safety-outlier-explorer/wiki/API)
- [User Requirements](https://github.com/RhoInc/safety-outlier-explorer/wiki/User-Requirements) 
- [Data Guidelines](https://github.com/RhoInc/safety-outlier-explorer/wiki/Data-Guidelines)
